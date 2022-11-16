import * as React from 'react'
import Section from '../components/ui/presentational/section';
import {H3, Paragraph} from '../theme/fonts';

const NotFoundPage = () => {
  return (
    <Section>
      <H3>Page not found</H3>
      <Paragraph>
        Sorry 😔, we couldn’t find what you were looking for.
      </Paragraph>
    </Section>
  )
}

export default NotFoundPage

export const Head = () => <title>tiina.dev - Not found</title>
