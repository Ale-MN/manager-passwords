import FormGenerator from "./FormGenerator/FormGenerator";
import HeaderGenerator from "./HeaderGenerator/HeaderGenerator";

export default function GeneratorPage() {
  return (
    <div>
      <HeaderGenerator />
      <FormGenerator />
    </div>
  );
}
