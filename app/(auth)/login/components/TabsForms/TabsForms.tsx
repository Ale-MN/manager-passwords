import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";

function TabsForms() {
  return (
    <Tabs
      defaultValue="signin"
      className="w-[400px] bg-slate-400/20 rounded-2xl p-2 "
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signin" className="cursor-pointer ">
          Ingreso
        </TabsTrigger>
        <TabsTrigger value="signup" className="cursor-pointer">
          Registro
        </TabsTrigger>
      </TabsList>
      <TabsContent value="signin">
        <Card>
          <CardContent className="space-y-2">
            <LoginForm />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="signup">
        <Card>
          <CardContent className="space-y-2">
            <RegisterForm />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default TabsForms;
