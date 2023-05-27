export class SampleClass{
    public static staticMethod() : string {
        return "staticMethod";
    }

    public instanceMethod() : string {
        return "instanceMethod";
    }
    public instanceMethod2() : string {
        return "instanceMethod2";
    }}

export class WrapperClass{
    
    private sample : SampleClass = new SampleClass();

    public static staticMethod() : string {
        return SampleClass.staticMethod();
    }

    public instanceMethod() : string {
        return this.sample.instanceMethod();
    }
}
