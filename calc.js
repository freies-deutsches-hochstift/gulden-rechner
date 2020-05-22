(function() {

    /*
     * Setup
     */

    let gulden1 = document.getElementById("gulden1");
    let kreuzer1 = document.getElementById("kreuzer1");
    let gulden2 = document.getElementById("gulden2");
    let kreuzer2 = document.getElementById("kreuzer2");

    let outcomeIndicatorGulden = document.getElementById("resultGulden");
    let outcomeIndicatorKreuzer = document.getElementById("resultKreuzer");

    let saveAndContinueButton = document.getElementById("saveAndContinue");

    /*
     * Handle calculation.
     */

    function parseIntOrNan(input) {
        let output = parseInt(input);
        if (isNaN(output) === true) return 0;
        else return output;
    }

    function calculateGuldenOutcome() {

        let valueGulden1 = parseIntOrNan(gulden1.value);
        let valueKreuzer1 = parseIntOrNan(kreuzer1.value);
        let valueGulden2 = parseIntOrNan(gulden2.value);
        let valueKreuzer2 = parseIntOrNan(kreuzer2.value);

        let resultGulden = valueGulden1 + valueGulden2;
        let prelimResultKreuzer = valueKreuzer1 + valueKreuzer2;

        resultGulden += Math.floor(prelimResultKreuzer / 60);
        let resultKreuzer = prelimResultKreuzer % 60;

        outcomeIndicatorGulden.textContent = resultGulden;
        outcomeIndicatorKreuzer.textContent = resultKreuzer;

    }

    gulden1.addEventListener('change', calculateGuldenOutcome);
    kreuzer1.addEventListener('change', calculateGuldenOutcome);
    gulden2.addEventListener('change', calculateGuldenOutcome);
    kreuzer2.addEventListener('change', calculateGuldenOutcome);

    /*
     * Handle logging and continued editing
     */

    let logTable = document.getElementById("logTable");

    function ensureLogTableExists() {

        if (logTable === undefined || logTable === null) {

            let logTableSection = document.createElement("section");

            logTable = document.createElement("table");

            let thead = document.createElement("thead");
            let theadtr = document.createElement("tr");

            let theadTh1 = document.createElement("th");
            theadTh1.textContent = "Rechnung";
            theadtr.appendChild(theadTh1);

            let theadTh2 = document.createElement("th");
            theadTh2.textContent = "Resultat";
            theadtr.appendChild(theadTh2);

            thead.appendChild(theadtr);
            logTable.appendChild(thead);

            logTableSection.appendChild(logTable);

            document.body.appendChild(logTableSection);

        }

    }

    function generateLogTableLine(left, right) {

        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        td1.textContent = left;
        tr.appendChild(td1);

        let td2 = document.createElement("td");
        td2.textContent = right;
        tr.appendChild(td2);

        return tr;

    }

    saveAndContinueButton.addEventListener('click', function() {

        // Write current data to log table

        ensureLogTableExists();

        let valueGulden1 = parseIntOrNan(gulden1.value);
        let valueKreuzer1 = parseIntOrNan(kreuzer1.value);
        let valueGulden2 = parseIntOrNan(gulden2.value);
        let valueKreuzer2 = parseIntOrNan(kreuzer2.value);

        logTable.appendChild(generateLogTableLine(valueGulden1 + " Gulden, " + valueKreuzer1 + " Kreuzer + " + valueGulden2 + " Gulden, " + valueKreuzer2 + " Kreuzer", outcomeIndicatorGulden.textContent + " Gulden, " + outcomeIndicatorKreuzer.textContent + " Kreuzer"));

        // Empty calculator and fill with current result

        gulden1.value = outcomeIndicatorGulden.textContent;
        kreuzer1.value = outcomeIndicatorKreuzer.textContent;

        gulden2.value = "0";
        kreuzer2.value = "0";

        outcomeIndicatorGulden.textContent = "0";
        outcomeIndicatorKreuzer.textContent = "0";

    });

})();
