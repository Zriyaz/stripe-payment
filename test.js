stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      return stripe.charges.create(
        {
          amount: product.price * 100,
          currency: 'INR',
          customer: customer.id,
          receipt_email: token.email,
          description: product.name,
        },
        { idempotencyKey }
      );
    })
    .then((result) => {
      res.status(200).json(result);
      console.log(result)
    })
    .catch((err) => {
      console.log(err);
    });