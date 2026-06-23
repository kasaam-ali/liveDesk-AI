export async function POST(request) {
  try {
    const formData = await request.json();
    const { name, phone, course } = formData;

    if (!name || !phone || !course) {
      return Response.json(
        { error: 'Name, phone, and course are required' },
        { status: 400 }
      );
    }

    // In production, this would:
    // 1. Store the visitor in a database
    // 2. Send a WhatsApp confirmation via Twilio
    // 3. Log the conversation for analytics

    console.log('Visitor form submitted:', { name, phone, course });

    return Response.json({
      success: true,
      visitor: { name, phone, course },
      message: `Thank you, ${name}! Your information has been recorded. We will contact you shortly regarding the ${course} course.`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Form submission error:', error);
    return Response.json(
      { error: 'Form submission failed' },
      { status: 500 }
    );
  }
}
