import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./button"
import { Checkbox } from "./checkbox"
import { Input } from "./input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  type FormItemProps,
} from "./form"

type FormItemSize = NonNullable<FormItemProps["size"]>

const sizes: FormItemSize[] = ["default", "sm", "lg"]

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Enter a valid email address."),
  terms: z.boolean().refine((value) => value === true, {
    message: "Accept the terms to continue.",
  }),
})

type ProfileValues = z.infer<typeof profileSchema>

const meta = {
  title: "UI/Form",
  component: FormItem,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof FormItem>

export default meta
type Story = StoryObj<typeof meta>

function ProfileFormFields({
  form,
  size,
}: {
  form: ReturnType<typeof useForm<ProfileValues>>
  size?: FormItemSize
}) {
  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field, fieldState }) => (
          <FormItem size={size}>
            <FormLabel>Full name</FormLabel>
            <FormControl>
              <Input
                placeholder="Ada Lovelace"
                variant={fieldState.error ? "error" : "default"}
                {...field}
              />
            </FormControl>
            <FormDescription>Your public display name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field, fieldState }) => (
          <FormItem size={size}>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="name@studio.com"
                variant={fieldState.error ? "error" : "default"}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="terms"
        render={({ field }) => (
          <FormItem size={size}>
            <div className="flex items-start gap-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked === true)}
                  aria-label="Accept terms"
                />
              </FormControl>
              <div className="space-y-1">
                <FormLabel>Accept terms</FormLabel>
                <FormDescription>You must accept before saving.</FormDescription>
                <FormMessage />
              </div>
            </div>
          </FormItem>
        )}
      />
    </>
  )
}

function ValidInvalidDemo({ size }: { size?: FormItemSize }) {
  const validForm = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "Ada Lovelace",
      email: "ada@example.com",
      terms: true,
    },
    mode: "onSubmit",
  })

  const invalidForm = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "A",
      email: "not-an-email",
      terms: false,
    },
    mode: "onSubmit",
  })

  React.useEffect(() => {
    void invalidForm.trigger()
  }, [invalidForm])

  return (
    <div className="grid w-full max-w-3xl gap-8 md:grid-cols-2">
      <Form {...validForm}>
        <form
          className="space-y-4"
          onSubmit={validForm.handleSubmit(() => undefined)}
          noValidate
        >
          <p className="font-geist text-sm font-medium text-foreground">Valid</p>
          <ProfileFormFields form={validForm} size={size} />
          <Button type="submit">Save profile</Button>
        </form>
      </Form>
      <Form {...invalidForm}>
        <form
          className="space-y-4"
          onSubmit={invalidForm.handleSubmit(() => undefined)}
          noValidate
        >
          <p className="font-geist text-sm font-medium text-foreground">Invalid</p>
          <ProfileFormFields form={invalidForm} size={size} />
          <Button type="submit">Save profile</Button>
        </form>
      </Form>
    </div>
  )
}

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      {sizes.map((size) => (
        <ValidInvalidDemo key={size} size={size} />
      ))}
    </div>
  ),
}

export const States: Story = {
  render: () => {
    const hiddenMessageForm = useForm<ProfileValues>({
      defaultValues: { name: "Ada Lovelace", email: "ada@example.com", terms: true },
    })
    const visibleMessageForm = useForm<ProfileValues>({
      defaultValues: { name: "A", email: "bad", terms: false },
      resolver: zodResolver(profileSchema),
      mode: "onSubmit",
    })

    React.useEffect(() => {
      void visibleMessageForm.trigger()
    }, [visibleMessageForm])

    return (
      <div className="grid w-full max-w-2xl gap-8 md:grid-cols-2">
        <Form {...hiddenMessageForm}>
          <form className="space-y-4">
            <p className="font-geist text-sm text-neutral-500">Message hidden</p>
            <FormField
              control={hiddenMessageForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <Form {...visibleMessageForm}>
          <form className="space-y-4">
            <p className="font-geist text-sm text-neutral-500">Message visible</p>
            <FormField
              control={visibleMessageForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input variant="error" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    )
  },
}

export const AsChild: Story = {
  render: () => {
    const form = useForm<{ website: string }>({
      defaultValues: { website: "" },
    })

    return (
      <Form {...form}>
        <form className="w-full max-w-sm space-y-4">
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl asChild>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    )
  },
}
