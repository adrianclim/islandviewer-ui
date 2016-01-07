function loadStartPage(){
    $("#content #main-content,#content #side-bar").empty();
    $("#content #main-content").load("index");
    $("#content #side-bar").html("Please select a genome from the list. Use the search box to bring matching genomes to the top of the list.")
}

function loadGenome(idNumber){
    var url = "accession/NC11111.1".replace('NC11111.1',idNumber);
    var contentContainer = $("#content #main-content");
    contentContainer.append("<div class=\"genome\"><\/div>");
    var targetContainer = contentContainer.children().last();
    targetContainer.load(url);
}

function loadAdditionalGenomeFromSearchBar(){
    var nameindex = $("#genomelist").val();
    var idname = $("#genomelist").children().eq(nameindex).text();
    console.log(nameindex);
    console.log(idname);
    var leftbracket = idname.indexOf("(");
    var rightbracket= idname.indexOf(")");
    idname = idname.slice(leftbracket+1,rightbracket);
    console.log(idname);
    loadGenome(idname);
}

function newResultsPage(){
    if(!($("#genomelist").val())) {
        return;
    }
    var idnumber = $("#genomelist").val();

    $("#content #main-content").empty();
    loadGenome(idnumber);

    $("#content #side-bar").empty();
    $("#content #side-bar").load("sidebar")
}

/*
function goto_results() {
    if(!($("#genomelist").val())) {
        return;
    }
    var url = "accession/NC11111.1".replace('NC11111.1',$("#genomelist").val());
    $("#content #main-content").empty();
    $("#content #main-content").load(url);

    $("#content #side-bar").empty();
    $("#content #side-bar").load("sidebar")
}
*/

function loadGenomeList(){
    url = "browse/json/";

    $(".additional_genome").append("<div class=\"genome_selector_dialog\">Select a second genome to display:<br \/>");
    $(".additional_genome").append("<select id=\"genomelist\" class=\"extraclass\" style=\"width:550px;\" data-placeholder=\"Select a genome...\"><option><\/option>");
    $(".additional_genome").append("<\/select><br \/><span ><a href=\"javascript:loadAdditionalGenomeFromSearchBar();\">Display genome</a></span></div>");

    $.ajax({
        url: url,
        type: "get",
        dataType: "json",
        beforeSend: function () {
            $("#loadingspinner").show("fast");
        },
        success: function(data) {
            $("#loadingspinner").hide("fast");
            $("#genomelist").empty();
            var genomes = data.genomes;
            for(var i = 0; i < genomes.length; ++i) {
                $("#genomelist").append("<option value=\"" + genomes[i].aid + "\">" + genomes[i].name + " (" + genomes[i].ext_id + ")</option>\n");
            }

            //$('#show_second_link').html("Hide dialog");
            //$('#genome_selector_dialog').slideToggle('fast');
            $("#genomelist").trigger("chosen:updated");

        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loadingspinner").hide("fast");
            console.log(xhr.status);
            console.log(thrownError);
        }

    });
}

$(document).ready(function(){
    loadStartPage();
});

