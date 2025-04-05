const weatherCondition = "sunny";

switch (weatherCondition) {
    case "sunny":
        document.getElementById("box-icon").name = "sun";
        break;  
    case "cloudy":
        document.getElementById("box-icon").name = "cloudy";     
        break;
    case "rainy":
        document.getElementById("box-icon").name = "rainy";
        break;
    case "snowy":
        document.getElementById("box-icon").name = "snowy";
        break;
}
