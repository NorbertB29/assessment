$(document).ready( function () {

	var inputField = $('#arabic-input');
	var submitBtn = $('#submit-btn');

	$(submitBtn).click( function (e) {
		e.preventDefault();

		var arabicInput = $(inputField).val();

		if(arabicInput != '') {
			convert(arabicInput);
		}

	});

});


function convert (arabicInput) {

	var digit = ['zero','one','two','three','four','five','six','seven','eight','nine'];
	var ten = ['ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
	var tens = ['ten','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];

	var numberLength = arabicInput.length;
	var number = Number(arabicInput);


	if ((number >= 0) && (numberLength <= 4) && (Number.isInteger(number))) {

		switch (numberLength) {
			case 0: printFinal('Please enter valid number');
				break;
			case 1: printFinal(digit[number]);
				break;
			case 2: printFinal(tensDigit(number, arabicInput));
				break;
			case 3: printFinal(hundredDigit(number, arabicInput));
				break;
			case 4: printFinal(thousandDigit(number, arabicInput));
				break;
			default: printFinal('Please enter integer number between 0 - 1 000');
				break;
		}

	} else {
		printFinal('Please enter integer number between 0 - 1 000');
	}

	function tensDigit (num, strNum) {

		var word = '';

		var firstDigit = parseInt(strNum.substr(0,1));
		var secondDigit = parseInt(strNum.substr(1,1));

		if (firstDigit === 0) {
			word = word.concat(digit[secondDigit]);
		} else if (firstDigit === 1) {
			word = word.concat(ten[secondDigit]);
		} else {

			if (secondDigit !== 0) {
				word = word.concat(tens[firstDigit-1] + '-' + digit[secondDigit]);
			} else {
				word = word.concat(tens[firstDigit-1]);
			}

		}

		return word;

	}

	function hundredDigit (num, strNum) {

		var word = '';

		var firstDigit = parseInt(strNum.substr(0,1));
		var nextTensDigit = parseInt(strNum.substr(1,2));

		if (firstDigit === 0) {

			return tensDigit(nextTensDigit, strNum.substr(1,2));

		} else if (firstDigit === 1) {

			if (nextTensDigit !== 0) {
				word = word.concat(' hundred and ');
				return word.concat(tensDigit(nextTensDigit, strNum.substr(1,2)));

			} else {
				word = word.concat(' hundred');
				return word;
			}

		} else {

			if (nextTensDigit !== 0) {
				word = word.concat(digit[firstDigit] + ' hundred and ');
				return word.concat(tensDigit(nextTensDigit, strNum.substr(1,2)));

			} else {
				word = word.concat(digit[firstDigit] + ' hundred');
				return word;
			}

		}

	}

	function thousandDigit (num, strNum) {

		var word = '';

		var firstDigit = parseInt(strNum.substr(0,1));
		var nextTwoDigit = parseInt(strNum.substr(1,2));
		var nextThreeDigit = parseInt(strNum.substr(1,3));
		var firstHalfDigit = parseInt(strNum.substr(0,2));
		var secondHalfDigit = parseInt(strNum.substr(2,2));

		if (firstDigit === 0) {

			return hundredDigit(nextThreeDigit, strNum.substr(1,3));

		} else if (firstDigit === 1) {

			if (nextTwoDigit !== 0) {
				word = word.concat(tensDigit(firstHalfDigit, strNum.substr(0,2)) + ' hundred and ').concat(tensDigit(secondHalfDigit, strNum.substr(2,2)));
				return word;

			} else {

				if (nextThreeDigit === 0) {
					word = word.concat('thousand');
					return word;
				} else {
					word = word.concat('thousand and ' + tensDigit(secondHalfDigit, strNum.substr(2,2)));
					return word;
				}

			}

		} else {

			if (nextTwoDigit !== 0) {
				word = word.concat(tensDigit(firstHalfDigit, strNum.substr(0,2)) + ' hundred and ').concat(tensDigit(secondHalfDigit, strNum.substr(2,2)));
				return word;

			} else {

				if (nextThreeDigit === 0) {
					word = word.concat(digit[firstDigit] + ' thousand');
					return word;
				} else {
					word = word.concat(digit[firstDigit] + ' thousand and ' + tensDigit(secondHalfDigit, strNum.substr(2,2)));
					return word;
				}


			}

		}

	}

}

function printFinal (word) {
	
	var finalOut = $('#final-phrase');

	$(finalOut).text(word);
}
