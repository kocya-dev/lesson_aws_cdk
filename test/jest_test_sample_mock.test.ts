import {SampleArrowFunction, SampleMethod} from '../src/sample/sample_module'
import * as Sample from '../src/sample/sample_module'
import { Instance } from 'aws-cdk-lib/aws-ec2';

jest.mock('../src/sample/sample_module', () => {
    // 指定しない箇所は元のモジュールのままにしたい
    const originalModule = jest.requireActual('../src/sample/sample_module');
  
    return {
      __esModule: true,
      ...originalModule,
      SampleArrowFunction: () => 'mockSampleArrowFunction',
      SampleMethod : () => 'mockSampleMethod',
    };
});



test('Test mock', () => {
    // *指定でも関数名直接importでも等しくmock化されている
    expect(Sample.SampleArrowFunction()).toEqual("mockSampleArrowFunction");
    expect(SampleArrowFunction()).toEqual("mockSampleArrowFunction");
    expect(Sample.SampleMethod()).toEqual("mockSampleMethod");
    expect(SampleMethod()).toEqual("mockSampleMethod");
});
