import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class S3HostingStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'LessonAwsCdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    // S3
    const websiteBucket = new cdk.aws_s3.Bucket(this, 'WebsiteBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    
    // Cloudfront
    const originAccessIdentity = new cdk.aws_cloudfront.OriginAccessIdentity(
      this,
      'OriginAccessIdentity',
      {
        comment: 'website-distribution-originAccessIdentity',
      }
    );

    // S3 バケットポリシー設定
    const webSiteBucketPolicyStatement = new cdk.aws_iam.PolicyStatement({
      actions: ['s3:GetObject'],
      effect: cdk.aws_iam.Effect.ALLOW,
      principals: [
        new cdk.aws_iam.CanonicalUserPrincipal(
          originAccessIdentity.cloudFrontOriginAccessIdentityS3CanonicalUserId
        ),
      ],
      resources: [`${websiteBucket.bucketArn}/*`],
    });

    websiteBucket.addToResourcePolicy(webSiteBucketPolicyStatement);

    // CloudFront
    const distribution = new cdk.aws_cloudfront.Distribution(this, 'distribution', {
      comment: 'website-distribution',
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          ttl: cdk.Duration.seconds(300),
          httpStatus: 403,
          responseHttpStatus: 403,
          responsePagePath: '/error.html',
        },
        {
          ttl: cdk.Duration.seconds(300),
          httpStatus: 404,
          responseHttpStatus: 404,
          responsePagePath: '/error.html',
        },
      ],
      defaultBehavior: {
        allowedMethods: cdk.aws_cloudfront.AllowedMethods.ALLOW_GET_HEAD,
        cachedMethods: cdk.aws_cloudfront.CachedMethods.CACHE_GET_HEAD,
        cachePolicy: cdk.aws_cloudfront.CachePolicy.CACHING_OPTIMIZED,
        viewerProtocolPolicy:
          cdk.aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        origin: new cdk.aws_cloudfront_origins.S3Origin(websiteBucket, {
          originAccessIdentity,
        }),
      },
      priceClass: cdk.aws_cloudfront.PriceClass.PRICE_CLASS_ALL,
    });

    // S3コンテンツ
    new cdk.aws_s3_deployment.BucketDeployment(this, 'WebsiteDeploy', {
      sources: [
        cdk.aws_s3_deployment.Source.data(
          '/index.html',
          '<html><body><h1>Hello World</h1></body></html>'
        ),
        cdk.aws_s3_deployment.Source.data(
          '/error.html',
          '<html><body><h1>Error!!!!!!!!!!!!!</h1></body></html>'
        ),
        cdk.aws_s3_deployment.Source.data('/favicon.ico', ''),
      ],
      destinationBucket: websiteBucket,
      distribution: distribution,
      distributionPaths: ['/*'],
    });
  }
}
