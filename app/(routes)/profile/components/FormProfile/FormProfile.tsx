"use client";

import React, { useState } from "react";
import { FormProfileProps } from "./FormProfie.types";
import { z } from "zod";
import { formSchema } from "./FormProfile.form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { UploadButton } from "@/lib/uploadthing";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function FormProfile(props: FormProfileProps) {
  const { user } = props;
  const router = useRouter();
  const [showUploadPhoto, setShowUploadPhoto] = useState(false);
  const [photoUploaded, setPhotoUploaded] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      profileImage: user.profileImage || "",
      username: user.username || "",
      id: user.id,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch("/api/profile", values);
      toast("Profile updated");
    } catch (error) {
      toast("Algo ocurrió mal");
    }

    router.refresh();
    setShowUploadPhoto(false);
    setPhotoUploaded(false);
  };
  return (
    <div className="max-w-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="profileImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mt-2">Imagen de perfil</FormLabel>
                <FormControl>
                  <div>
                    <div className="flex gap-2 items-center">
                      <Image
                        src={
                          user.profileImage
                            ? user.profileImage
                            : "/images/default-profile.jpg"
                        }
                        alt="Image Profile"
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                      <div className="w-[200px]">
                        {showUploadPhoto ? (
                          <UploadButton
                            className="rounded-md text-slate-800 bg-slate-200 mt-3"
                            {...field}
                            endpoint="profileImage"
                            onClientUploadComplete={(res) => {
                              form.setValue("profileImage", res?.[0].ufsUrl);
                              setShowUploadPhoto(true);
                              setPhotoUploaded(true);
                            }}
                            onUploadError={(error: Error) => {
                              console.log(error);
                            }}
                          />
                        ) : (
                          <Button
                            onClick={() => setShowUploadPhoto((prev) => !prev)}
                          >
                            <Upload className="mr-2 w-4 h-4" />
                            Cambiar Foto
                          </Button>
                        )}
                      </div>
                    </div>
                    {photoUploaded && (
                      <p className="text-xs font-semibold"> Imagen subida </p>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Deadpool" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Deadpool" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Guardar</Button>
        </form>
      </Form>
    </div>
  );
}
