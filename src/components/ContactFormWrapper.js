"use client"
import { cloneElement, useState } from "react"

const jsonToFormData = (json) => {
  try {
    const data = new FormData()

    for (let k in json) {
      data.append(k, json[k])
    }

    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

const ErrorMessage = () => {
  return (
    <div className="text-primary">
      <strong>url</strong> or <strong>siteUrl</strong> and{" "}
      <strong>formId</strong> are mandatory attributes
    </div>
  )
}


const ContactFormWrapper = ({ children, siteUrl, formId }) => {



  const [isSent, setSent] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [hasError, setError] = useState(null)

  const apiUrl =`${siteUrl}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback/`

  const formSubmitHandler = (payload) => {

    setLoading(true)
    setError(null)

    const payloadWithAdditionalData = {
      ...payload,
      "_wpcf7": "9",
      "_wpcf7_version": "5.7.2",
      "_wpcf7_locale": "en_US",
      "_wpcf7_unit_tag": "wpcf7-f9-p9-o1",
      "_wpcf7_container_post": "1",
    }



    fetch(apiUrl, {
      method: "POST",
      body: jsonToFormData(payloadWithAdditionalData),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.status !== "mail_sent") throw resp.message
        setSent(true)
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const Form = cloneElement(children, {
    handler: formSubmitHandler,
    isLoading,
    isSent,
    hasError,
  })

  return <div>{(siteUrl && formId) ? Form : <ErrorMessage />}</div>
}

export default ContactFormWrapper