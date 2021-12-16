git init && git add . && git commit -m "first commit" && git branch -M master && git remote add origin https://github.com/hwalanlee/ami-deploy.git && git push -u origin master
git add . && git commit -m "from home" && git push -u origin master


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
        - sh 파일 만들 때, npm install 후에 실행
        - 나중에 웹훅 다시 해결
        - 해결해야 할 일
            - jenkins command not found
                - cat /etc/passwd
                - JENKINS-41339 probably bogus PATH
                - 생활코딩 user, 권한, 그룹 관련 다시 보기


전달 
    - 여러 개 cdk로 할 경우 stack 간 충돌 발생
    - git트리거용 리포와 파이프라인용 리포 분리 필요, 방법 있는지 확인해야