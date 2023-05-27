import {SampleClass, WrapperClass} from '../src/sample/sample_module_class'
import {ExtWrapperClass} from '../src/sample/ext_wrapper_class'
import {SampleArrowFunction, SampleMethod} from '../src/sample/sample_module'
import * as Sample from '../src/sample/sample_module'

jest.mock('../src/sample/sample_module', () => {
    // 指定しない箇所は元のモジュールのままにしたい
    const originalModule = jest.requireActual('../src/sample/sample_module');
  
    //Mock the default export and named export 'foo'
    return {
      __esModule: true,
      ...originalModule,
      SampleArrowFunction: () => 'mockSampleArrowFunction',
    };
});



test('Test part mock', () => {
    // *指定でも関数名直接importでも等しくmock化されている
    expect(Sample.SampleArrowFunction()).toEqual("mockSampleArrowFunction");
    expect(SampleArrowFunction()).toEqual("mockSampleArrowFunction");
    // mock化指定していない部分は元のまま
    expect(Sample.SampleMethod()).toEqual("SampleMethod");
    expect(SampleMethod()).toEqual("SampleMethod");

    // クラスのインスタンスメソッドを部分的にmock化
    const orgInstanceMethod : any = SampleClass.prototype.instanceMethod;
    SampleClass.prototype.instanceMethod = jest.fn().mockImplementation(()=> "mockInstanceMethod");
    expect(new SampleClass().instanceMethod()).toEqual("mockInstanceMethod");
    expect(new WrapperClass().instanceMethod()).toEqual("mockInstanceMethod"); // 同ファイル内Wrapper > Sampleの呼び出しもmockが呼ばれる
    expect(new ExtWrapperClass().instanceMethod()).toEqual("mockInstanceMethod"); // 他ファイルからimportした場合もmockが適用される
    expect(ExtWrapperClass.staticMethod()).toEqual("staticMethod"); // これはmock化されていないので元の処理のまま
    SampleClass.prototype.instanceMethod = orgInstanceMethod; // 元に戻す
    expect(new ExtWrapperClass().instanceMethod()).toEqual("instanceMethod"); // 戻った
});
