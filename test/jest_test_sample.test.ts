import {SampleClass} from '../src/sample/sample_module_class'
import * as sample from '../src/sample/sample_module'

test('test', () => {
    console.log(SampleClass.staticMethod());
    console.log(new SampleClass().instanceMethod());
    console.log(sample.SampleArrowFunction());
    console.log(sample.SampleMethod());
});
    