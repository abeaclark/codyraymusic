import React from 'react'
import { fonts, colors, applicationStyles, metrics } from 'themes'
import presets from 'lib/presets'
import MailchimpSubscribe from "react-mailchimp-subscribe"
import Button from 'components/base/button'
import Analytics from 'lib/googleAnalytics'

const emailSignupStyles = {
  image: {
    maxWidth: '100%',
    marginTop: "10px",
    marginBottom: "10px",
    [presets.Mobile]: {
      maxHeight: '300px',
      marginBottom: "30px",
    },
  },
  outer: {
    padding: 0, 
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: colors.lightGrey,
  },
  statusText: {
    textAlign: 'center',
    margin: '5px 0px',
    color: colors.grey,
    fontSize: '14px',
  },
  title: {
    margin: 0,
    marginBottom: '.5em',
    fontSize: '1.5em !important',
    textAlign: 'center',
    [presets.Mobile]: {
      fontSize: "2em !important",
    }  
  },
  subtitle: {
    textAlign: 'center',
    margin: '0 !important', 
    marginBottom: '1em !important', 
    fontSize: '1.2em !important',
    lineHeight: '1em !important',
    width: '90%',
    [presets.Mobile]: {
      fontSize: "1.5em !important",
    }
  },
  disclaimer: {
    color: colors.grey,
    textAlign: 'center',
    fontSize: '8px !important',
    padding: '0 !important',
    margin: '5px !important',
    [presets.Mobile]: {
      fontSize: "12px !important",
    }
  },
  
  background: {
    display: "flex",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGrey,
    width: '100%',
    maxWidth: '600px',
    padding: '20px',
    margin: '5px',
    [presets.Mobile]: {
      padding: '20px',
      margin: '20px',
    }
  },
  button: {
    fontSize: "1em",
    width: '100%',
    maxWidth: '300px',
    backgroundColor: colors.green,
    margin: '0px',
    padding: "10px",
    [presets.Mobile]: {
      margin: '10px',
      padding: "15px",
    }
  },
  input: {
    width: "100%",
    maxWidth: '400px',
    borderRadius: '5px',
    border: 0,
    padding: '10px',
    fontSize: "1.5em",
    textAlign: 'center',
    [presets.Mobile]: {
      padding: '10px',
      fontSize: "1.5em",
    },
    marginBottom: '1rem',
  }
}

// Error: Timeout
const SubscribeForm = ({ url, status, message, onValidated, ...otherProps }) => {
  const { title, subtitle, buttonText, disclaimer, image } = otherProps.data.frontmatter
  let email, firstName, lastName
  const submit = () => {
    email && email.value.indexOf("@") > -1 &&
    onValidated({
      EMAIL: email.value,
      FNAME: firstName.value,
      LNAME: lastName.value,
    })
  }

  let display = <div/>
  if (status === 'error') {
    if (message === "Error: Timeout") {
      display = <div css={emailSignupStyles.statusText}>There was an error subscribing. Please try again later.</div>
    } else {
      display = <div css={emailSignupStyles.statusText}>You're already subscrbied. Invite a friend to subscribe!</div>
    }
  }

  if (status === 'success') {
    display = <div css={emailSignupStyles.statusText}>Got it! Thanks for signing up</div>
  }

  if (status === 'sending') {
    display = <div css={emailSignupStyles.statusText}>Adding you to the list...</div>
  }

  return (
    <div css={emailSignupStyles.outer} >
      <div
        css={emailSignupStyles.background}
      >
        {image &&
          <img css={emailSignupStyles.image} src={image} />
        }
        { title && 
          <h1 css={emailSignupStyles.title}>
            {title}
          </h1>
        }
        {subtitle && 
          <p css={emailSignupStyles.subtitle}>
            {subtitle}
          </p>
        }
        {display}
        <input
          style={emailSignupStyles.input}
          ref={node => (firstName = node)}
          type="text"
          placeholder="First Name"
          autoFocus="true"
        />
        <input
          style={emailSignupStyles.input}
          ref={node => (lastName = node)}
          type="text"
          placeholder="Last Name"
        />
        <input
          style={emailSignupStyles.input}
          ref={node => (email = node)}
          type="email"
          placeholder="your@email.here"
        />
        <input
          style={{ display: 'none' }}
          type="text"
          name="SIGNUP"
          id="SIGNUP"
          value="*|SIGNUP|*"
        />
        <br />
        <Button
          style={emailSignupStyles.button}
          onClick={submit}
        >
          {buttonText}
        </Button>
        <p css={emailSignupStyles.disclaimer}>
          {disclaimer}
        </p>
      </div>
    </div>
  )
}

const SubscribeElement = ({ url, ...otherProps }) => (
  <MailchimpSubscribe
    url={url}
    render={({ subscribe, status, message }) => (
      <SubscribeForm
        status={status}
        message={message}
        onValidated={formData => {
          subscribe(formData)
          Analytics.lead({ target: `Subscribe for free track`, page: otherProps.path, email: formData.EMAIL, firstName: formData.FNAME, lastName: formData.LNAME })
        }}
        {...otherProps}
      />
    )}
  />
)

export const FormPage = ({ data } ) => {
  const frontmatter = data.frontmatter
  return(
    <div css={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {frontmatter.mailchimpURL &&
        <SubscribeElement
          url={frontmatter.mailchimpURL + `&SIGNUP=${frontmatter.path}`}
          data={data}
        />
      }
    </div>
  )
}

export default FormPage