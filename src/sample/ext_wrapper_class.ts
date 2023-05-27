import {SampleClass} from './sample_module_class'

export class ExtWrapperClass{
    
    private sample : SampleClass = new SampleClass();

    public static staticMethod() : string {
        return SampleClass.staticMethod();
    }

    public instanceMethod() : string {
        return this.sample.instanceMethod();
    }

    public instanceMethod2() : string {
        return this.sample.instanceMethod2();
    }
}
