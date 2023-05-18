import {SampleClass, SampleArrowFunction, SampleMethod} from '../src/sample/sample_module'
import * as Sample from '../src/sample/sample_module'


test('Test spy for class static method', () => {
    // spy前は普通
    console.log(SampleClass.staticFunction());
    // spy後はmockに置き換え
    const spy = jest.spyOn(SampleClass, "staticFunction").mockImplementation(() => "mockStatisFunction");
    console.log(SampleClass.staticFunction());
    // restore後は元に戻る
    spy.mockRestore();
    console.log(SampleClass.staticFunction());
});
    
test('Test spy for class instance method', () => {
    const sampleVal : SampleClass = new SampleClass();
    // spy前は普通
    console.log(sampleVal.instanceMethod());
    // spy後はmockに置き換え
    const spy = jest.spyOn(sampleVal, "instanceMethod").mockImplementation(() => "mockInstanceMethod");
    console.log(sampleVal.instanceMethod());
    // restore後は元に戻る
    spy.mockRestore();
    console.log(sampleVal.instanceMethod());
});
    
