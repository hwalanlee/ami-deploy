git init && git add . && git commit -m "first commit" && git branch -M master && git remote add origin https://github.com/hwalanlee/ami-deploy.git && git push -u origin master
git add . && git commit -m "from company" && git push -u origin master
 
 
남은 할 일 
    - 전부 git remote remove origin
    - 전체 프로젝트 레포 만들기
    - 개별 폴더가 동작하는지 확인
        - 순서: packer > cdk-infra > packer > cdk-lc > asg-switch
        - packer는 생략
        - cdk-infra
            - cdk.Tags.of(alb).add("name", "lan-cicd-alb");   // target group 과 동일한 name을 갖게 됨 > sdk에서 arn 검색을 위해 태그 조정 필요
        - cdk-lc
            - load balancer - name: 'lan-cicd-alb'  // 기존 infra에서 tag 'name' 추가해주지 않으면 작동 안 함. 왜?
            - targetGroupName: 'lan-alb-second-tg',   // tag 텝에서 Name으로 적용됐는지 확인해야 !!!!
    - 젠킨스 파이프라인
        - 순서: (수동) packer > cdk-infra > simple-nodejs push || (자동) packer > cdk-lc > asg-switch
    - jenkins-node ami 새로 만들기 > lan-jenkins-new
        - /etc/sudoers 에서 권한 추가한 후
        - sudo su -s /bin/bash jenkins >>> jenkins 로그인
        - sudo yum -y update
        - aws configure 
        - git (연동은 job 생성 시 입력)
            - sudo yum install git
        - node
            - sudo yum -y update
            - curl -sL https://rpm.nodesource.com/setup_12.x | sudo bash -
            (- sudo yum clean all && sudo yum makecache fast)
            (- sudo yum install -y gcc-c++ make)
            - sudo yum install -y nodejs
        - cdk
            - npm install -g aws-cdk
        - packer
            - sudo yum install -y yum-utils
            - sudo yum-config-manager --add-repo https://rpm.releases.hashicorp.com/AmazonLinux/hashicorp.repo
            - sudo yum -y install packer
    - CodeDeploy
    - 표준화, 변수화        
        - example.json > "ami_name": "lan-cicd-ami-systemctl"



남은 과제
    - 여러 개 cdk로 할 경우 stack 간 충돌 발생
    - git트리거용 리포와 파이프라인용 리포 분리 필요, 방법 있는지 확인해야
    - ec2-user의 PATH 환경변수를 jenkins에 그대로 전달
    - jenkins에 모든 권한 할당? jenkins 서버니까 그래도 되지 않음?
        - /etc/sudoers 에 추가
            - Jenkins ALL=(ALL) ALL
            - Defaults:jenkins !authenticate
        >>> 해결! sudo su -s /bin/bash [username]



