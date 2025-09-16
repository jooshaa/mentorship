const Contract = require("../models/contract");


async function countPaidMoney(paymentId, money) {
    const payment = await Contract.findByPk(paymentId)
    if(!payment) throw new Error('payment not found')

    const now = Date.now()
    const expiredTime = payment.createdAt
    const isExpired = (now - expiredTime)/ (1000 * 60 * 60 * 24)

    if (isExpired > 7){
        payment.status = 'failed'
        await payment.save()
        throw new Error('Payment expired')
    }


    if(money >= payment.amount){
        payment.status = "paid"
    }else if (money < payment.amount){
        return{ payment, remaining: money - payment.amount}
    }

    await payment.save()

    return payment

}