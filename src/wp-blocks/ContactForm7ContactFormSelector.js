import ContactFormWrapper from "@/components/ContactFormWrapper";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupTextarea
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { gql, useQuery } from "@apollo/client";
import { useForm } from "@tanstack/react-form";
import { isValidPhoneNumber } from "libphonenumber-js";
import * as z from "zod";

const formSchema = z.object({
  //'your-subject': z.string().min(1, "Champ requis"),
  'your-name':  z.string().min(1, "Champ requis"),
  'your-company':  z.string().optional(),
  'your-email': z.string().email("Email invalide"),
  'your-phone': z.string().refine((value) => isValidPhoneNumber(value, "FR"),
  "Numéro invalide"),
  'your-city': z.string().min(1, "Champ requis"),
  'your-message': z.string().optional(),
})


    const GET_CONTACT_FORM_ID = gql`
      query MyQuery {
        optionContactForm {
          id
          menuTitle
          parentId
          pageTitle
          settingsContact {
            formId
          }
        }
      }
    `;


function Form({ handler, isLoading, isSent, hasError }) {

    const form = useForm({
    defaultValues: {
      //'your-subject': "",
      'your-name': "",
      'your-company': "",
      'your-email': "",
      'your-phone': "",
      'your-city': "",
      'your-message': "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
    handler(value)
    },
  })


  return (
    <div>
        {/* <div>isLoading: {isLoading ? "Loading" : "false"}</div>
        <div>isSent: {isSent ? "Sent" : "false"}</div>
        <div>Error: {hasError || "null"}</div> */}
        <form className="mb-5"
          id="contact-form"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            {/* <form.Field
              name="your-subject"
            >
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldContent>
                      <FieldLabel htmlFor="your-subject">
                        Motif du contact
                      </FieldLabel>
                    </FieldContent>
                    <Select
                      name={field.name}
                      value={field.state.value}
                      onValueChange={field.handleChange}
                    >
                      <SelectTrigger
                        id="your-subject"
                        aria-invalid={isInvalid}
                        className="min-w-full"
                      >
                        <SelectValue placeholder="Choisissez un motif" />
                      </SelectTrigger>
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                      <SelectContent position="item-aligned">
                        <SelectItem value="m1">Motif 1</SelectItem>
                        <SelectItem value="m2">Motif 2</SelectItem>
                        <SelectItem value="m3">Motif 3</SelectItem>
                        <SelectItem value="m4">Motif 4</SelectItem>
                        <SelectItem value="m5">Motif 5</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                )
              }}
            </form.Field> */}
            <form.Field
              name="your-name"
            >
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Votre nom</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Entrez votre nom"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>
            <form.Field
              name="your-company"
            >
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Votre société</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Entrez votre nom de société"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>
            <form.Field
              name="your-email"
            >
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Votre email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Entrez votre adresse email"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>
            <form.Field
              name="your-phone"
            >
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Votre téléphone</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Entrez votre numéro de téléphone"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>
            <form.Field
              name="your-city"
            >
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Votre ville</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Entrez votre ville"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>
            <form.Field
              name="your-message"
            >
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Votre message</FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Entrez votre message"
                        rows={6}
                        className="min-h-24 resize-none"
                        aria-invalid={isInvalid}
                      />
                    </InputGroup>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>
          </FieldGroup>
        </form>
        <Button
          variant="primary"
          type="submit" form="contact-form"
          disabled={isLoading || isSent}
        >
          {isLoading ? "Envoi en cours..." : isSent ? "Message envoyé" : "Envoyer"}
        </Button>
    </div>
  )
}


export default function ContactForm7ContactFormSelector() {


  const { data, loading, error } = useQuery(GET_CONTACT_FORM_ID);
  const siteUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL

console.log('data', data)

  if (loading) return null;
  if (error) return <div>Error...</div>;

	return (
		<ContactFormWrapper siteUrl={siteUrl} formId={data?.optionContactForm?.settingsContact?.formId}>
      <Form />
		</ContactFormWrapper>
	);
}

ContactForm7ContactFormSelector.fragments = {
	key: `CustomContactForm7ContactFormSelectorBlockFragment`,
	entry: gql`
		fragment CustomContactForm7ContactFormSelectorBlockFragment on ContactForm7ContactFormSelector {
			attributes {
				content
				cssClassName
			}
		}
	`,
};

ContactForm7ContactFormSelector.displayName = "ContactForm7ContactFormSelector";