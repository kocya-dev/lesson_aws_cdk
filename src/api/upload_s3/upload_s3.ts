/* s3にデータを保存するlambda関数を作成する */
import { S3 } from 'aws-sdk';
import { S3Event } from 'aws-lambda';

// lambda関数のハンドラを作成する
export const handler = async (event: S3Event) => {
  const s3 = new S3();

  const result = await s3
    .putObject({
      Bucket: "WebsiteBucket",
      Key: 'memo.txt',
      Body: 'Hello memo',
    })
    .promise();

  return result;
}
