import * as sample from '../src/sample/sample_module'

test('test', () => {
    console.log(sample.SampleClass.StaticFunction());
    console.log(new sample.SampleClass().instanceMethod());
    console.log(sample.SampleArrowFunction());
    console.log(sample.SampleMethod());
});
    