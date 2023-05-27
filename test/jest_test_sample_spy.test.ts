import {SampleClass, WrapperClass} from '../src/sample/sample_module_class'
import * as Sample from '../src/sample/sample_module'


test('Test spy for class static method', () => {
    // spy前は普通
    expect(SampleClass.staticMethod()).toEqual("staticMethod");
    // spy後はmockに置き換え
    const spy = jest.spyOn(SampleClass, "staticMethod").mockImplementation(() => "mockStatisFunction");
    expect(SampleClass.staticMethod()).toEqual("mockStatisFunction");
    // restore後は元に戻る
    spy.mockRestore();
    expect(SampleClass.staticMethod()).toEqual("staticMethod");
});
    
test('Test spy for class instance method', () => {
    const sampleVal : SampleClass = new SampleClass();
    // spy前は普通
    expect(sampleVal.instanceMethod()).toEqual("instanceMethod");
    // spy後はmockに置き換え
    const spy = jest.spyOn(sampleVal, "instanceMethod").mockImplementation(() => "mockInstanceMethod");
    expect(sampleVal.instanceMethod()).toEqual("mockInstanceMethod");
    // restore後は元に戻る
    spy.mockRestore();
    expect(sampleVal.instanceMethod()).toEqual("instanceMethod");
});

test('Test spy for inner class static method ', () => {
    // spy前は普通
    expect(WrapperClass.staticMethod()).toEqual("staticMethod");
    // spy後はmockに置き換え
    const spy = jest.spyOn(WrapperClass, "staticMethod").mockImplementation(() => "mockStatisFunction");
    expect(WrapperClass.staticMethod()).toEqual("mockStatisFunction");
    // restore後は元に戻る
    spy.mockRestore();
    expect(WrapperClass.staticMethod()).toEqual("staticMethod");
});
    
test('Test spy for inner class instance method', () => {
    const sampleVal : WrapperClass = new WrapperClass();
    // spy前は普通
    expect(sampleVal.instanceMethod()).toEqual("instanceMethod");
    // spy後はmockに置き換え
    const orgMethod : any = SampleClass.prototype.instanceMethod;
    SampleClass.prototype.instanceMethod = jest.fn().mockImplementationOnce(()=> "mockInstanceMethod");
    expect(sampleVal.instanceMethod()).toEqual("mockInstanceMethod");
    // Once指定なので1回呼び出し後はundefinedになるので戻しておく
    SampleClass.prototype.instanceMethod = orgMethod;
    expect(sampleVal.instanceMethod()).toEqual("instanceMethod");
});

