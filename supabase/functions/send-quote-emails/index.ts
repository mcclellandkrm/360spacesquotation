import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { SmtpClient } from 'https://deno.land/x/smtp/mod.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { quoteId, clientEmail, adminEmail, quoteDetails } = await req.json()

    const client = new SmtpClient({
      connection: {
        hostname: Deno.env.get('SMTP_HOST'),
        port: parseInt(Deno.env.get('SMTP_PORT')),
        tls: true,
        auth: {
          username: Deno.env.get('SMTP_USER'),
          password: Deno.env.get('SMTP_PASS'),
        },
      },
    })

    // Format the quote details into a nice HTML email
    const formatQuoteHTML = (details) => `
      <h2>Virtual Tour Quote Details</h2>
      <h3>Client Information</h3>
      <p>School/Venue: ${details.clientInfo.schoolName}</p>
      <p>Contact: ${details.clientInfo.contactName}</p>
      <p>Email: ${details.clientInfo.email}</p>
      <p>Phone: ${details.clientInfo.phone}</p>
      
      <h3>Selected Spaces</h3>
      <ul>
        ${details.spaces.map(space => `
          <li>${space.quantity}x ${space.name} (${space.panosPerSpace} panoramas each)</li>
        `).join('')}
      </ul>

      <h3>Selected Add-ons</h3>
      <ul>
        ${details.addOns.map(addon => `
          <li>${addon.name} - £${addon.price}</li>
        `).join('')}
      </ul>

      <h3>Selected Features</h3>
      <ul>
        ${details.features.map(feature => `
          <li>${feature.name} - £${feature.price}</li>
        `).join('')}
      </ul>

      <h3>Hosting Plan</h3>
      <p>${details.hostingPlan?.name || 'No hosting plan selected'} - £${details.hostingPlan?.price || 0}</p>

      <h3>Total Quote Value</h3>
      <p><strong>£${details.total}</strong></p>
    `

    // Send email to admin
    await client.send({
      from: Deno.env.get('SMTP_FROM'),
      to: adminEmail,
      subject: `New Virtual Tour Quote - ${quoteDetails.clientInfo.schoolName}`,
      html: formatQuoteHTML(quoteDetails),
    })

    // Send confirmation to client
    await client.send({
      from: Deno.env.get('SMTP_FROM'),
      to: clientEmail,
      subject: 'Your Virtual Tour Quote',
      html: formatQuoteHTML(quoteDetails),
    })

    await client.close()

    return new Response(
      JSON.stringify({ message: 'Emails sent successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})