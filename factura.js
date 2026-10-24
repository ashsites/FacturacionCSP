(() => {

    const css = `
#fac{
    position:fixed;
    left:-10000px;
    top:0;
    width:720px;
    background:#fdfaf7;
    color:#4a4650;
    font:16px/1.5 "Nunito","Trebuchet MS",Arial,sans-serif;
}

#fac *{
    box-sizing:border-box;
    margin:0;
    padding:0;
}

#fac .fx{
    background:#fff;
    overflow:hidden;
}

#fac .fx-top{
    background:#d3e8f1;
    padding:20px 36px 18px;
    text-align:center;
    border-bottom:8px solid #f6d9e1;
}

#fac .fx-nombre{
    font:500 34px "Fredoka","Nunito",sans-serif;
    color:#3f6477;
    line-height:1.15;
}

#fac .fx-tel{
    margin-top:5px;
    font:800 17px "Nunito",sans-serif;
    color:#3f6477;
}

#fac .fx-sinpe{
    margin-top:2px;
    font:700 17px "Nunito",sans-serif;
    color:#3f6477;
}

#fac .fx-body{
    padding:26px 36px 8px;
}

#fac .fx-head{
    display:flex;
    justify-content:space-between;
    align-items:flex-end;
    gap:20px;
    margin-bottom:18px;
}

#fac .fx-tipo{
    display:inline-block;
    padding:3px 16px;
    border-radius:999px;
    background:#f6d9e1;
    color:#85536a;
    font:500 15px "Fredoka",sans-serif;
    letter-spacing:.5px;
    text-transform:uppercase;
}

#fac .fx-folio{
    margin-top:6px;
    font:500 30px "Fredoka",sans-serif;
    color:#4a4650;
}

#fac .fx-fecha{
    text-align:right;
    color:#948d99;
    font-weight:700;
    font-size:12px;
    text-transform:uppercase;
    letter-spacing:.6px;
    padding-bottom:4px;
}

#fac .fx-fecha b{
    display:block;
    font:500 19px "Fredoka",sans-serif;
    color:#4a4650;
    text-transform:none;
    letter-spacing:0;
}

#fac .fx-cli{
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:16px;
    background:#fdfaf7;
    border:2px solid #efe6e2;
    border-left:6px solid #96c4d8;
    border-radius:14px;
    padding:12px 18px;
    margin-bottom:16px;
}

#fac .fx-cli small{
    display:block;
    font-weight:700;
    font-size:12px;
    color:#948d99;
    text-transform:uppercase;
    letter-spacing:.6px;
}

#fac .fx-cli b{
    font:500 21px "Fredoka",sans-serif;
    color:#3f6477;
}

#fac .fx-cli .t{
    text-align:right;
}

#fac .fx-cli .t span{
    font:800 18px "Nunito",sans-serif;
    color:#5f8497;
}

#fac .fx-ent{
    background:#f6d9e1;
    color:#85536a;
    border-radius:14px;
    padding:11px 18px;
    margin-bottom:16px;
    text-align:center;
    font:500 18px "Fredoka",sans-serif;
}

#fac .fx-its{
    margin-bottom:6px;
}

/* ---------- Prenda desglosada ---------- */

#fac .fx-it{
    padding:16px 0 14px;
    border-bottom:2px dotted #efe6e2;
}

#fac .fx-it:last-child{
    border-bottom:0;
}

#fac .fx-it h4{
    font:500 22px "Fredoka",sans-serif;
    color:#85536a;
    margin-bottom:8px;
}

#fac .fx-lns{
    font-size:15px;
    line-height:1.65;
    color:#4a4650;
}

#fac .fx-ln{
    font-size:15px;
    color:#4a4650;
}

#fac .fx-pr .fx-pp{
    font:500 19px "Fredoka",sans-serif;
    color:#4a4650;
}

#fac .fx-ln b{
    color:#85536a;
    font-weight:700;
}

#fac .fx-sub{
    margin:10px 0 3px;
    padding-bottom:2px;
    border-bottom:2px dotted #d3e8f1;
    font:500 16px "Fredoka",sans-serif;
    color:#3f6477;
}

#fac .fx-notas{
    margin-top:4px;
    font-size:15px;
    line-height:1.5;
}

#fac .fx-pr{
    margin-top:10px;
    padding-top:8px;
    border-top:2px dotted #efe6e2;
}

#fac .fx-pr .fx-row{
    padding:1px 0;
}

#fac .fx-pr .fx-row.u{
    font-size:14px;
    color:#948d99;
    font-weight:600;
}

#fac .fx-pr .fx-row.p{
    font:500 20px "Fredoka",sans-serif;
    color:#4a4650;
}

#fac .fx-tot{
    margin:12px 0 0;
    padding:16px 22px;
    border:2px solid #d3e8f1;
    border-radius:16px;
    background:#fff;
}

#fac .fx-row{
    display:flex;
    justify-content:space-between;
    align-items:baseline;
    padding:3px 0;
    font-size:16px;
}

#fac .fx-row.g{
    font:500 24px "Fredoka",sans-serif;
    color:#3f6477;
}

#fac .fx-row.s{
    font:500 24px "Fredoka",sans-serif;
    margin-top:8px;
    padding-top:10px;
    border-top:2px dotted #efe6e2;
}

#fac .fx-row.ta{
    color:#948d99;
    font-weight:700;
    font-size:15px;
}

#fac .deb{
    color:#b8475e;
}

#fac .pag{
    color:#3f7f66;
}

#fac .fx-ab{
    margin:8px 0 2px;
    padding-top:10px;
    border-top:2px dotted #efe6e2;
}

#fac .fx-ab h5{
    font:700 12px "Nunito",sans-serif;
    color:#948d99;
    text-transform:uppercase;
    letter-spacing:.6px;
    margin-bottom:2px;
}

#fac .fx-ab .fx-row{
    font-size:15px;
    color:#4a4650;
}

#fac .fx-est{
    margin:18px 0 4px;
    text-align:center;
}

#fac .fx-sello{
    display:inline-block;
    padding:8px 30px;
    border-radius:999px;
    font:500 22px "Fredoka",sans-serif;
    letter-spacing:1px;
}

#fac .fx-sello.ok{
    background:#dff0e7;
    color:#3f7f66;
    border:3px solid #3f7f66;
}

#fac .fx-sello.no{
    background:#f6d9e1;
    color:#85536a;
    border:3px solid #e8aebf;
    font-size:19px;
    letter-spacing:.3px;
    padding:7px 26px;
}

#fac .fx-vence{
    margin-top:7px;
    font-size:13.5px;
    color:#948d99;
    font-weight:600;
}

#fac .fx-pie{
    margin-top:22px;
    padding:18px 36px 24px;
    text-align:center;
    background:#d3e8f1;
    border-top:8px solid #f6d9e1;
    color:#3f6477;
}

#fac .fx-pie b{
    display:block;
    font:500 22px "Fredoka",sans-serif;
}

#fac .fx-pie span{
    font-size:14px;
    font-weight:600;
    color:#5f8497;
}
`;

    const st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);


    const esc = s =>
        String(s ?? '').replace(
            /[&<>"]/g,
            c => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;'
            }[c])
        );


    const fd = f => {

        const partes = String(f).split('-');

        if (partes.length !== 3) {
            return String(f);
        }

        const [y, mo, d] = partes;

        return d + '/' + mo + '/' + y;
    };


    const cargarScript = src =>
        new Promise((ok, mal) => {

            const existente =
                [...document.scripts].find(
                    s => s.src === src
                );

            if (existente) {

                if (typeof html2canvas === 'function') {
                    ok();
                    return;
                }

                existente.addEventListener(
                    'load',
                    () => ok(),
                    { once: true }
                );

                existente.addEventListener(
                    'error',
                    () => mal(new Error('No se pudo cargar html2canvas.')),
                    { once: true }
                );

                return;
            }

            const s = document.createElement('script');

            s.src = src;

            s.onload = () => ok();

            s.onerror = () =>
                mal(
                    new Error(
                        'No se pudo cargar html2canvas. Revisa tu conexión a Internet.'
                    )
                );

            document.head.appendChild(s);
        });

    const bloques = (r, i) => {

        const B = [];

        let cur = { sub: null, l: [] };

        B.push(cur);

        const ln = (k, v) => cur.l.push([k, v]);

        const sub = t => {

            cur = { sub: t, l: [] };

            B.push(cur);
        };

        const telaL = (a, d) => {

            if (a == 'Estampada') {

                ln('Tela', 'Estampada');

                if (d) {
                    ln('Diseño del estampado', d);
                }

            } else {

                ln('Tela', a == 'Buzo' ? 'Buzo' : 'Lisa');

                if (d) {
                    ln('Color', d);
                }
            }
        };

        const n = +i.cant || 1;

        ln('Producto', pn(i));
        ln('Cantidad', n);
        ln('Talla', i.talla || '-');

        if (tp(r, i) == 'Apartado') {

            if (i.nota) {
                ln('Nota', i.nota);
            }

            return B;
        }

        ln('Género', gn(i));

        if (i.prod == 'Salida') {
            salL(i).forEach(([k, v]) => ln(k, v));
        }

        const t = TOP[i.prod];
        const b = BOT[i.prod];

        if (!sinTela(i.prod) && !t && !b) {

            sub(i.prod == 'Tutu' ? 'Tutú' : 'Tela y color');

            if (i.prod == 'Tutu') {

                ln('Color', i.det || '—');
                ln('Cinta', i.cinta || 'Sin cinta');

            } else {

                telaL(i.acab, i.det);
            }
        }

        if (t) {

            const pij = i.prod == 'Pijama';

            if (pij && i.todo != null) {

                sub('Parte de arriba');

                ln('Todo estampado', i.todo);

                if (i.todo == 'Sí') {

                    telaL('Estampada', i.tdet);

                    sub('Mangas');

                    ln('Tela', 'Igual que la parte de arriba');

                } else {

                    telaL(i.tacab, i.tdet);

                    sub('Mangas');

                    telaL(i.macab, i.mdet);
                }

                ln('Manga', i.manga || 'Corta');

                sub('Diseño');

            } else {

                sub(pij ? 'Mangas' : t);

                telaL(i.tacab || i.acab, i.tdet ?? i.det);

                if (mangaExtra(i)) {
                    ln('Manga', i.manga);
                }

                if (pij) {

                    ln('Manga', i.manga || 'Corta');

                    sub('Frente');
                }
            }

            if (i.dis == 'Con diseño') {

                ln('Diseño', 'Sí');

                if (i.disd) {
                    ln('Dibujo', i.disd);
                }

                if (i.pers == 'Sí') {
                    ln('Diseño del cliente', 'Sí');
                }

            } else {

                ln('Diseño', 'No');
            }
        }

        if (b) {

            sub(bn(i));

            telaL(i.bacab || i.acab, i.bdet ?? i.det);

            if (i.botd) {
                ln('Detalle', i.botd);
            }
        }

        if (i.nota) {

            sub('Notas');

            cur.nota = i.nota;
        }

        return B;
    };


    function facturaHTML(r) {

        const d = tot(r) - pag(r);

        const ab = r.abonos || [];

        const items =
            r.items
                .map((i, k) => {

                    const n = +i.cant || 1;

                    const apart = tp(r, i) == 'Apartado';

                    const cuerpo =
                        bloques(r, i)
                            .map(bl => `
                                ${bl.sub ? `<div class="fx-sub">${esc(bl.sub)}</div>` : ''}

                                ${
                                    bl.l.length
                                        ? `<div class="fx-lns">${
                                            bl.l
                                                .map(
                                                    ([a, v]) =>
                                                        `<span class="fx-ln"><b>${esc(a)}:</b> ${esc(v)}</span>`
                                                )
                                                .join(', ')
                                        }</div>`
                                        : ''
                                }

                                ${bl.nota ? `<div class="fx-notas">${esc(bl.nota)}</div>` : ''}
                            `)
                            .join('');

                    return `
                        <div class="fx-it">

                            <h4>
                                ${apart ? 'Apartado' : 'Encargo'} ${k + 1}
                            </h4>

                            ${cuerpo}

                            <div class="fx-pr">

                                <div class="fx-lns">${
                                    n > 1
                                        ? `<span class="fx-ln"><b>Precio unidad:</b> ${m(i.precio)}</span>, `
                                        : ''
                                }<span class="fx-ln fx-pp"><b>Precio:</b> ${m(n * i.precio)}</span></div>

                            </div>

                        </div>
                    `;

                })
                .join('');


        const abonos =
            ab.length
                ? `
                    <div class="fx-ab">

                        <h5>Abonos</h5>

                        ${
                            ab
                                .map(
                                    a => `
                                        <div class="fx-row">

                                            <span>

                                                ${fd(a.f)}

                                                ${
                                                    (a.metodo || a.nota)
                                                        ? ' · ' + esc(mt(a.metodo || a.nota))
                                                        : ''
                                                }

                                            </span>

                                            <span>${m(a.monto)}</span>

                                        </div>
                                    `
                                )
                                .join('')
                        }

                        ${
                            ab.length > 1
                                ? `
                                    <div class="fx-row ta">
                                        <span>Total abonado</span>
                                        <span>${m(pag(r))}</span>
                                    </div>
                                `
                                : ''
                        }

                    </div>
                `
                : '';

        return `
            <div class="fx">

                <div class="fx-top">

                    <div class="fx-nombre">
                        Creaciones Solo Punto
                    </div>

                    <div class="fx-tel">
                        Tel. 6234-2975
                    </div>

                    <div class="fx-sinpe">
                        SINPE: ${SINPE} (${SINPE_N})
                    </div>

                </div>

                <div class="fx-body">

                    <div class="fx-head">

                        <div>

                            <span class="fx-tipo">
                                ${esc(rtipo(r))}
                            </span>

                            <div class="fx-folio">
                                N.º ${r.id}
                            </div>

                        </div>

                        <div class="fx-fecha">

                            Fecha

                            <b>${fd(r.fecha)}</b>

                        </div>

                    </div>

                    <div class="fx-cli">

                        <div>

                            <small>Cliente</small>

                            <b>${esc(r.cliente)}</b>

                        </div>

                        ${
                            r.tel
                                ? `
                                    <div class="t">

                                        <small>Teléfono</small>

                                        <span>${esc(r.tel)}</span>

                                    </div>
                                `
                                : ''
                        }

                    </div>

                    ${
                        fh(r)
                            ? `
                                <div class="fx-ent">
                                    Entrega: ${esc(fh(r))}
                                </div>
                            `
                            : ''
                    }

                    <div class="fx-its">
                        ${items}
                    </div>

                    ${
                        r.nota
                            ? `
                                <div class="fx-sub">Notas del pedido</div>

                                <div class="fx-notas" style="margin-bottom:8px">
                                    ${esc(r.nota)}
                                </div>
                            `
                            : ''
                    }

                    <div class="fx-tot">

                        <div class="fx-row g">

                            <span>Total</span>

                            <span>${m(tot(r))}</span>

                        </div>

                        ${abonos}

                        ${
                            d > 0
                                ? `
                                    <div class="fx-row s">

                                        <span>Saldo pendiente</span>

                                        <span class="deb">${m(d)}</span>

                                    </div>
                                `
                                : ''
                        }

                    </div>

                    <div class="fx-est">

                        ${
                            d > 0
                                ? `
                                    <span class="fx-sello no">
                                        Vence el ${fv(r)}
                                    </span>

                                    <div class="fx-vence">
                                        Se guarda por 2 meses
                                        desde la fecha del pedido
                                    </div>
                                `
                                : `
                                    <span class="fx-sello ok">
                                        ✓ PAGADO
                                    </span>
                                `
                        }

                    </div>

                </div>

                <div class="fx-pie">

                    <b>¡Gracias por su compra!</b>

                    <span>
                        Hecho con cariño · Creaciones Solo Punto
                    </span>

                </div>

            </div>
        `;
    }

    window.descargarFactura =
        async function (formato, id) {

            // Solo PNG
            if (formato !== 'png') {
                return;
            }

            const r =
                id != null
                    ? R.find(x => x.id == id)
                    : E;

            if (!r) {

                alert('No se encontró la factura.');

                return;
            }

            const btns = [...document.querySelectorAll('.fx-btn')];

            btns.forEach(b => {

                b.disabled = true;

                b.dataset.t = b.textContent;

                b.textContent = 'Preparando…';

            });

            const caja = document.createElement('div');

            caja.id = 'fac';

            try {

                await cargarScript(
                    'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'
                );

                caja.innerHTML = facturaHTML(r);

                document.body.appendChild(caja);

                if (document.fonts && document.fonts.ready) {
                    await document.fonts.ready;
                }

                await new Promise(resolve => setTimeout(resolve, 200));

                const canvas =
                    await html2canvas(
                        caja,
                        {
                            scale: 2,
                            backgroundColor: '#ffffff',
                            useCORS: true,
                            allowTaint: false,
                            x: 0,
                            y: 0,
                            scrollX: 0,
                            scrollY: 0,
                            windowWidth: 720
                        }
                    );

                const nombre =
                    'Factura-SoloPunto-' +
                    r.id +
                    '-' +
                    String(r.cliente)
                        .trim()
                        .replace(/[^\wáéíóúñÁÉÍÓÚÑ]+/g, '_')
                        .slice(0, 30);

                canvas.toBlob(
                    blob => {

                        if (!blob) {

                            alert('No se pudo generar la imagen.');

                            return;
                        }

                        const url = URL.createObjectURL(blob);

                        const a = document.createElement('a');

                        a.href = url;

                        a.download = nombre + '.png';

                        document.body.appendChild(a);

                        a.click();

                        a.remove();

                        setTimeout(() => URL.revokeObjectURL(url), 3000);

                    },
                    'image/png'
                );

            } catch (err) {

                console.error('Error al crear factura:', err);

                alert(
                    'No se pudo crear la imagen de la factura.\n\n' +
                    (err.message || 'Error desconocido.')
                );

            } finally {

                caja.remove();

                btns.forEach(b => {

                    b.disabled = false;

                    b.textContent = b.dataset.t;

                });

            }

        };

})();