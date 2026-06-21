function analyzeLoan(){

let name = document.getElementById("name").value;
let age = Number(document.getElementById("age").value);
let employment = Number(document.getElementById("employment").value);
let experience = Number(document.getElementById("experience").value);

let income = Number(document.getElementById("income").value);
let expenses = Number(document.getElementById("expenses").value);
let debt = Number(document.getElementById("debt").value);

let credit = Number(document.getElementById("credit").value);
let loan = Number(document.getElementById("loan").value);
let term = Number(document.getElementById("term").value);

if(
!name ||
!age ||
!income ||
!credit ||
!loan ||
!term
){
alert("Please fill all required fields");
return;
}

let score = 0;

// Income Score
if(income >= 100000)
score += 25;
else if(income >= 60000)
score += 20;
else if(income >= 30000)
score += 15;
else if(income >= 15000)
score += 8;

// Credit Score
if(credit >= 800)
score += 25;
else if(credit >= 750)
score += 20;
else if(credit >= 700)
score += 15;
else if(credit >= 650)
score += 10;

// Employment Stability
if(employment == 1)
score += 20;
else if(employment == 2)
score += 15;
else if(employment == 3)
score += 10;

// Experience
if(experience >= 10)
score += 10;
else if(experience >= 5)
score += 8;
else if(experience >= 2)
score += 5;

// Age
if(age >= 25 && age <= 55)
score += 10;


// Debt To Income Ratio
let dti = ((debt + expenses) / income) * 100;

if(dti < 30)
score += 10;
else if(dti < 50)
score += 5;

// Loan To Income Ratio
let loanRatio = loan / (income * 12);

if(loanRatio <= 2)
score += 10;
else if(loanRatio <= 4)
score += 5;

// Final Limit
if(score > 100)
score = 100;

// Analysis Builder
let analysisList = [];

// Income Analysis
if(income >= 100000)
analysisList.push("High monthly income indicates strong financial stability.");
else if(income >= 50000)
analysisList.push("Moderate income supports regular loan repayments.");
else
analysisList.push("Limited income may affect repayment capacity.");

// Credit Analysis
if(credit >= 800)
analysisList.push("Excellent credit score reflects strong credit behavior.");
else if(credit >= 700)
analysisList.push("Good credit score supports loan eligibility.");
else
analysisList.push("Low credit score increases lending risk.");

// Debt Analysis
if(dti < 30)
analysisList.push("Debt-to-Income ratio is healthy.");
else if(dti < 50)
analysisList.push("Debt burden is moderate.");
else
analysisList.push("High debt obligations may impact repayment ability.");



// Loan Amount Analysis
if(loanRatio <= 2)
analysisList.push(
"Requested loan amount is well within repayment capacity."
);
else if(loanRatio <= 4)
analysisList.push(
"Requested loan amount is moderate relative to annual income."
);
else
analysisList.push(
"Requested loan amount is high compared to annual income."
);

if(experience >= 10)
analysisList.push(
"Extensive work experience demonstrates strong employment stability."
);
else if(experience >= 5)
analysisList.push(
"Good professional experience supports income reliability."
);
else if(experience >= 2)
analysisList.push(
"Moderate work experience indicates developing career stability."
);
else
analysisList.push(
"Limited work experience may increase income uncertainty."
);

if(age >= 25 && age <= 55)
analysisList.push(
"Applicant falls within the preferred lending age range."
);
else
analysisList.push(
"Age profile may require additional lending review."
);



// Employment Analysis
if(employment == 1)
analysisList.push("Government employment provides stable income.");
else if(employment == 2)
analysisList.push("Private sector employment offers moderate stability.");
else if(employment == 3)
analysisList.push("Self-employment income may fluctuate.");
else
analysisList.push("Lack of employment increases risk.");

let analysis = analysisList.join("<br><br>");
let recommendationList = [];

if(credit < 700)
recommendationList.push(
"Improve credit score through timely repayments."
);

if(dti > 50)
recommendationList.push(
"Reduce existing debt obligations before applying."
);

if(loanRatio > 4)
recommendationList.push(
"Consider requesting a smaller loan amount."
);

if(income < 30000)
recommendationList.push(
"Increase income sources to improve repayment capacity."
);

if(score >= 75)
recommendationList.push(
"Eligible for standard loan products and favorable lending terms."
);

if(recommendationList.length === 0)
recommendationList.push(
"Maintain current financial behavior and credit profile."
);

let recommendation =
recommendationList.join("<br><br>");

let status = "";
let risk = "";
let probability = 0;

if(score >= 75){

    status = "APPROVED";
    risk = "LOW";
    probability = 90;

}
else if(score >= 50){

    status = "UNDER REVIEW";
    risk = "MEDIUM";
    probability = 65;

}
else{

    status = "REJECTED";
    risk = "HIGH";
    probability = 25;
}

let monthlyRate = 0.08 / 12;

let months = term * 12;

let emi =
(
loan *
monthlyRate *
Math.pow(1 + monthlyRate, months)
)
/
(
Math.pow(1 + monthlyRate, months) - 1
);

emi = emi.toFixed(2);

localStorage.setItem("name", name);
localStorage.setItem("score", score);
localStorage.setItem("probability", probability);
localStorage.setItem("status", status);
localStorage.setItem("risk", risk);
localStorage.setItem("income", income);
localStorage.setItem("expenses", expenses);
localStorage.setItem("debt", debt);
localStorage.setItem("credit", credit);
localStorage.setItem("loan", loan);
localStorage.setItem("term", term);
localStorage.setItem("analysis", analysis);
localStorage.setItem("recommendation", recommendation);
localStorage.setItem("dti", dti.toFixed(2));
localStorage.setItem("emi", emi);

window.location.href = "report.html";

}