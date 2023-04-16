# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

----

## メモ

### プロジェクト作成時
```
cdk init <xxx>  // 初期化
```

### 初期化
```
aws configure   // AWS認証情報設定
```

### インストール対象

|パッケージ|説明|
|---|---|
|@aws-cdk/*|CDK v1 (インストールしないこと)|
|aws-cdk|CDK v2|
|aws-cdk-lib/*|CDK v2|
|@types/aws-xxxx|AWS SDK 型情報|
|aws-sdk/*|SDK v2 (インストールしないこと)|
|@aws-sdk/*|SDK v3|


### CDKコマンド

|コマンド|説明|
|---|---|
|cdk synth|CloudFormationテンプレート作成|
|cdk bootstrap|初回デプロイ|
|cdk diff|差分確認|
|cdk deploy|デプロイ|
|cdk destroy|削除|

