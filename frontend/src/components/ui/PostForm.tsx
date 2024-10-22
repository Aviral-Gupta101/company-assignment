
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { LoaderCircle } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),

  description: z.string().min(3, {
    message: "Description must be at least 3 characters.",
  }),
})

export function PostForm() {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: ""
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)

    try {
      setIsLoading(true)
      await axios.post("http://localhost:3000/post/create", {
        title: values.title,
        description: values.description
      });

      form.reset({title: "", description: ""});

    } catch (error) {

      setError("Something went wrong");

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field}/>
              </FormControl>
              <FormDescription>
                This is your post title
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description" {...field} />
              </FormControl>
              <FormDescription>
                This is your post description
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormMessage className="text-center">
          {
            error === ""? "" : error
          }
        </FormMessage>
        {
          isLoading ? <Button className="m-0 w-full" type="submit" disabled>
            <LoaderCircle className="animate-spin"/>
          </Button> : <Button  className="m-0 w-full" type="submit">Submit</Button>
        }
      </form>
    </Form>
  )
}
