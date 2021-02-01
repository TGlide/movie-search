export function titleCase(value: string): string {
  var textArray = value.split(" ");
  var capitalizedText = "";
  for (var i = 0; i < textArray.length; i++) {
    capitalizedText +=
      textArray[i].charAt(0).toUpperCase() + textArray[i].slice(1) + " ";
  }
  return capitalizedText.trim();
}
