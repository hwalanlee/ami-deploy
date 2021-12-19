var AWS = require("aws-sdk");
AWS.config.update({ region: "ap-northeast-2" });

var resourcegroupstaggingapi = new AWS.ResourceGroupsTaggingAPI();
var elbv2 = new AWS.ELBv2();

// 1. 새 ami로 새 asg 만들기

// 1.1 ami id 가져오기
const getAmiId = async () => {
    var params = {
        TagFilters: [
            {
                Key: "Name",
                Values: ["lan-cicd-ami-systemctl"],
            },
        ],
        ResourceTypeFilters: ["ec2:image"]
    };
    try {
        const data = await resourcegroupstaggingapi
            .getResources(params)
            .promise();
        return data.ResourceTagMappingList[0].ResourceARN.split("/")[1];
    } catch (error) {
        console.error(error);
    }
};
var amiId = await getAmiId();

var params = {
    AutoScalingGroupName: "lan-cicd-second-asg",
    InstanceType: "t2.micro",

    LaunchTemplate: {
        LaunchTemplateId: "lt-0a20c965061f64abc",
        Version: "$Latest",
    },
    // MaxInstanceLifetime: 2592000,
    MaxSize: 3,
    MinSize: 1,
    VPCZoneIdentifier: "subnet-00a75b8c8659787dd,subnet-044e9414b6b61b262",
    KeyName: "lanKeyPair",
};
autoscaling.createAutoScalingGroup(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else console.log(data); // successful response
});

// 2. 기존 alb의 8080 리스너를 만들어 새 asg를 타겟 그룹(lan-alb-second-tg)으로 추가

// ------------------------------------------------------------------------

// 1. 두 번째 asg의 target group 찾기
const getTgArn = async () => {
    var paramsTg = {
        TagFilters: [
            {
                Key: "Name",
                Values: ["lan-alb-second-tg"],
            },
        ],
    };
    try {
        const data = await resourcegroupstaggingapi
            .getResources(paramsTg)
            .promise();
        return data.ResourceTagMappingList[0].ResourceARN;
    } catch (error) {
        console.error(error);
    }
};

// 2. alb 찾기
const getAlbArn = async () => {
    var paramsAlb = {
        TagFilters: [
            {
                Key: "name",
                Values: ["lan-cicd-alb"],
            },
        ],
    };
    try {
        const data = await resourcegroupstaggingapi
            .getResources(paramsAlb)
            .promise();
        const arr = data.ResourceTagMappingList;
        for (let index = 0; index < arr.length; index++) {
            if (
                arr[index].ResourceARN.indexOf(
                    "arn:aws:elasticloadbalancing:ap-northeast-2:367072688873:loadbalancer"
                ) != -1
            ) {
                return arr[index].ResourceARN;
            }
        }
    } catch (error) {
        console.error(error);
    }
};

// 3. alb arn으로 80 listener 찾기
async function getListenerArn() {
    const albArn = await getAlbArn();
    var paramsDescListener = {
        LoadBalancerArn: albArn,
    };
    try {
        const data = await elbv2
            .describeListeners(paramsDescListener)
            .promise();
        const array = data.Listeners;
        for (let index = 0; index < array.length; index++) {
            if (array[index].Port == 80) {
                return array[index].ListenerArn;
            }
        }
    } catch (error) {
        console.log(error);
    }
}

// 4. 찾은 listener의 target group 변경하기
async function modifyListener() {
    const tgArn = await getTgArn();
    const listenerArn = await getListenerArn();
    var paramsModify = {
        DefaultActions: [
            {
                TargetGroupArn: tgArn,
                Type: "forward",
            },
        ],
        ListenerArn: listenerArn,
    };
    elbv2.modifyListener(paramsModify, function (err, data) {
        if (err == null) {
            // 5. 8080 listener 삭제하기
            //
            //
            //
            //
        } else {
            console.log("modifyListener failed!");
        }
    });
}

modifyListener();
