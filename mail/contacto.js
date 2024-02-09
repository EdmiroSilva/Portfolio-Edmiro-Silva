$(document).ready(function () {
  $("#contactForm").submit(function (e) {
    e.preventDefault(); // Prevent the default form submission

    var name = $("#name").val().trim();
    var email = $("#email").val().trim();
    var subject = $("#subject").val().trim();
    var message = $("#message").val().trim();

    if (name == "" || subject == "" || message == "" || !validateEmail(email)) {
      $("#errorMessages").html(
        "<p class='text-danger'>Por favor, preencha todos os campos corretamente.</p>"
      );
      return;
    }

    // Enviar email usando SendGrid API
    $.ajax({
      type: "POST",
      url: "https://api.sendgrid.com/v3/mail/send",
      headers: {
        Authorization: "Bearer YOUR_SENDGRID_API_KEY",
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        personalizations: [
          {
            to: [{ email: "edmiirosilva2013@outlook.com" }], // Endereço de email do destinatário
            subject: subject,
          },
        ],
        from: { email: email }, // Seu endereço de email
        content: [{ type: "text/plain", value: message }],
      }),
      success: function (response) {
        $("#errorMessages").html(
          "<p class='text-success'>Mensagem enviada com sucesso!</p>"
        );
        $("#contactForm")[0].reset(); // Reset the form after successful submission
      },
      error: function () {
        $("#errorMessages").html(
          "<p class='text-danger'>Falha ao enviar a mensagem. Por favor, tente novamente mais tarde.</p>"
        );
      },
    });
  });

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
});
