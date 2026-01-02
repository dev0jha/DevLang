# Examples

### Hello World

```devlang
bolo "Hello DevLang"
```

### Simple Loop

```devlang
i = 1
jabtak i <= 5
  bolo i
  i = i + 1
```

### Variables and Arithmetic

```devlang
x = 10
y = 20
sum = x + y
bolo "Sum is: "
bolo sum
```

### Conditional Statements

```devlang
age = 18
agar age >= 18
  bolo "You can vote"
nhi_toh
  bolo "You cannot vote yet"
```

### Nested Conditions

```devlang
marks = 85
agar marks >= 90
  bolo "Grade: A+"
nhi_toh
  agar marks >= 75
    bolo "Grade: A"
  nhi_toh
    bolo "Grade: B"
```

### Countdown Timer

```devlang
count = 10
jabtak count > 0
  bolo count
  count = count - 1
bolo "Blast off!"
```

### Even Number Checker

```devlang
num = 1
jabtak num <= 10
  remainder = num % 2
  agar remainder == 0
    bolo num
  num = num + 1
```

### Multiplication Table

```devlang
num = 5
i = 1
bolo "Multiplication table of 5:"
jabtak i <= 10
  result = num * i
  bolo result
  i = i + 1
```

### Sum of First N Numbers

```devlang
n = 10
sum = 0
i = 1
jabtak i <= n
  sum = sum + i
  i = i + 1
bolo "Sum is: "
bolo sum
```

### Simple Calculator

```devlang
a = 15
b = 3
bolo "Addition: "
bolo a + b
bolo "Subtraction: "
bolo a - b
bolo "Multiplication: "
bolo a * b
bolo "Division: "
bolo a / b
```

### Factorial Calculator

```devlang
n = 5
factorial = 1
i = 1
jabtak i <= n
  factorial = factorial * i
  i = i + 1
bolo "Factorial is: "
bolo factorial
```
