type bmi = 'underweight' | 'normal' | 'overweight' | 'obese'  

const bmiCalculator = (height: number, weight: number): bmi => {
  if (height === 0) {
    throw new Error('Can\'t divided by zero!')
  }
  const bmi = weight / (height ** 2)
  if (bmi < 18.5)   
    return "underweight"
  else if (bmi < 25) 
    return "normal"
  else if (bmi < 30)
    return "overweight"
  else return "obese"
}

console.log(bmiCalculator(180, 74))