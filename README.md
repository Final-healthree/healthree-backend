# HEALTHREE

> 주제 : 의지박약인 사람들에게 동기를 생기게 해주는 자기관리 어플입니다.

# 1. 프로젝트 개요

## 작업기간

2022년 8월 26일~

<br>

## 팀원

`Back-end ` 이상현, 최유영

`Front-end` 최락현, 조영은, 유지완

| Name                 | Github                                              | Position |
| -------------------- | --------------------------------------------------- | -------- |
| 이상현 (Leader)      | [@phenomenonlee ](https://github.com/phenomenonlee) | `BE`     |
| 최락현 (Vice Leader) | [@chasura416 ](https://github.com/chasura416)       | `FE`     |
| 유지완               | [@NickYOOO](https://github.com/NickYOOO)            | `FE`     |
| 조은영               | [@yeun38](https://github.com/yeun38)                | `FE`     |
| 최유영               | [@waveinyu](https://github.com/waveinyu)            | `BE`     |

<br>

# 2. Git-Flow 전략

## Branch List

`main` <br>

-   배포 브랜치

`develop` <br>

-   로컬 작업 시 `merge`하는 중간 브랜치

`dev/sang` <br>

-   @phenomenonlee 로컬 작업 브랜치

`dev/yu` <br>

-   @waveinyu 로컬 작업 브랜치

<br>

## Pull Request

-   경로, 파일명, 기능은 백틱으로 작성

    -   `경로`
    -   `파일명`
    -   `기능` <br>PR : Create `auth_middleware` <br> PR : Modify details `user.controller.js` <br> PR : Resolve `Conflict`

<br>

-   상태 변화는 영문 동사로 작성
    -   Add, Create, Update, Modify

<br>

-   Assignees, Label 체크 필수 <br>
-   `Conflict` 발생 시 팀원과 공유 후 해결 전까지 `pull`/`push` 금지
-   `"어?"` 금지

<br>

## Commit

-   로컬 브랜치에서 `push`하기 전 `develop` 브랜치와 상태를 맞추기
    -   git pull origin develop

<br>

-   로컬 브랜치에서만 `push` 하기
-   기능 하나 완성 되면 커밋 무조건 하기
-   `commit message` 명시하기 (기능 구현 및 상태 업데이트 등)

<br>

## Push

-   `merge` 시 `Pull Request` 필수
-   로컬 브랜치에서 `console.log()`삭제 후 `merge`

<br>

## Bug

-   Issue 활용
-   Bug 발생 시 팀 노션 내 [트러블 슈팅](https://www.notion.so/b9ab1b43f44d42c0be5fc4c45cc0cd29?v=9a6a947295134c06a6589be6271f43ce)에도 작성

<br>

# 3. API 설계

# 4. 폴더 구조

# 5. 모듈 리스트

[팀 노션 - API](https://www.notion.so/API-1442e5ddccc349328d83325a1e85cf2b)

## Back-end 트러블 슈팅

[Back-end 트러블 슈팅](https://www.notion.so/b9ab1b43f44d42c0be5fc4c45cc0cd29?v=9a6a947295134c06a6589be6271f43ce)

## 팀 노션 페이지

[팀 노션 페이지](https://www.notion.so/864fe5f8be8f4736895b8c29197de182)

## Back-end 참고 자료

[Back-end 참고 자료](https://www.notion.so/a1a19e21a06c413baaa6ee3779bf76b3)
