$(document).ready(function () {
	var formNoticias = $("#form-noticias");

	formNoticias.on("submit", function() {
		try {
			var json = recordFromForm(formNoticias);
			addDataTable(json);
		} catch (e) {
			console.error(e);
		}
		return false;
	});

	function recordFromForm(form) {
		var inputs = form.find('input[type="text"], textarea');
		var json = "";
		inputs.each(function(idx, input) {
			var name = $(input).attr("name");
			var value = $(input).val();
			if (json !== "")
				json += ",";
			
			json += `"${name}": "${ value.trim() }"`;
			console.log(json);
		});
		json = `{${json}}`;
		return JSON.parse(json);
	}

	function addDataTable(noticiajson) {
		var tbody = $("#table-noticias tbody");
		var tr = $("<tr></tr>");
		var tdTitulo = $("<td></td>");
		var tdIntroducao = $("<td></td>");
		var tdAcoes = $("<td></td>");
		tdTitulo.text(noticiajson['titulo']);
		tdIntroducao.text(noticiajson['introducao']);

		var remover = $('<a href="#"></a>');
		remover.text("Remover");
		remover.addClass("btn btn-xs btn-danger");
		tdAcoes.append(remover);

		remover.on("click", function() {
			removeRow(tr);
		});

		tr.append(tdTitulo, tdIntroducao);
		tbody.append(tr);
	}

	function removeRow(tr) {
		tr.remove();
		showRowCount();
	}

	function showRowCount() {
		var trs = $("#table-noticas tbody tr");
		var total = trs.lenght;
		$("#table-noticas tfoot tr td span").text(total);
	}
});