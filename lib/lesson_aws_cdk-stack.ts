import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class LessonAwsCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'LessonAwsCdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    const hello =  new lambda.Function(this, 'HellpHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset(`src\\api\\hello`),
      handler: 'hello.handler'
    });
    new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: hello
    });
  }
}
