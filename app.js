const LOGO = 'logo.png';
const $ = s => document.querySelector(s);

const m = n =>
    '₡' + Math.round(+n || 0).toLocaleString('es-CR');

const cap = s =>
    s
        ? String(s).charAt(0).toUpperCase() + String(s).slice(1)
        : s;

const PROD = [
    'Conjunto',
    'Pijama',
    'Camisa',
    'Abrigo',
    'Vestido',
    'Salida',
    'Tutu',
    'Otros...'
];

const TOP = {
    'Conjunto': 'Camisa',
    'Pijama': 'Parte de arriba',
    'Camisa': 'Camisa',
    'Vestido': 'Parte de arriba',
    'Conjunto (camisa y short)': 'Camisa',
    'Camisa sola': 'Camisa'
};

const BOT = {
    'Conjunto': 'Short, licra o enagua',
    'Pijama': 'Short o pantalón',
    'Vestido': 'Parte de abajo',
    'Short': 'Short o pantalón',
    'Conjunto (camisa y short)': 'Short',
    'Short o pantalón solo': 'Short o pantalón'
};

const isOtro = p =>
    p == 'Otros...' || p == 'Otro...';

const sinTela = p =>
    isOtro(p) || p == 'Salida';

const pn = i =>
    isOtro(i.prod)
        ? (i.otro || 'Otros')
        : (i.prod || '—');

const pl = it =>
    (!it.prod || PROD.includes(it.prod))
        ? PROD
        : [it.prod, ...PROD];

const tela = (a, d, c = 'color') =>
    a == 'Estampada'
        ? 'estampada' + (d ? ': ' + d : '')
        : (a == 'Buzo' ? 'buzo' : 'lisa') +
        (d ? ', ' + c + ' ' + d : '');

const telaG = i =>
    tela(i.acab, i.det);

const telaT = i =>
    tela(
        i.tacab || i.acab,
        i.tdet ?? i.det,
        'color/fondo'
    );

const telaB = i =>
    tela(
        i.bacab || i.acab,
        i.bdet ?? i.det
    );

const bn = i =>
    BOT[i.prod]
        ? (
            i.bot ||
            (
                BOT[i.prod].includes(' o ')
                    ? 'Short'
                    : BOT[i.prod]
            )
        )
        : '';

const botOps = it =>
    it.prod == 'Conjunto'
        ? (gn(it) == 'Mujer' ? ['Short', 'Licra', 'Enagua'] : ['Short'])
        : ['Short', 'Pantalón'];

const salL = it =>
    (it.ref || 'Sí') == 'Sí'
        ? [['Referencia', 'El cliente tiene referencia']]
        : [
            ['Referencia', 'No'],
            ['Pijama', it.pij || 'No'],
            ['Gorro', it.gorro || 'No'],
            ['Cobija', it.cobija || 'No'],
            ['Diseño', it.sdis || 'No'],
            ...(it.sdet ? [['Detalles', it.sdet]] : [])
        ];

const mg = i =>
    i.prod == 'Pijama'
        ? ', manga ' + (i.manga || 'Corta').toLowerCase()
        : '';

const gen = i =>
    isOtro(i.prod)
        ? ''
        : i.prod == 'Tutu'
            ? 'Color ' + (i.det || '—') + ', ' + (i.cinta || 'Sin cinta').toLowerCase()
            : 'Tela ' + telaG(i);

const dis = i =>
    i.dis == 'Con diseño'
        ? 'con diseño' + (i.disd ? ' (' + i.disd + ')' : '')
        : 'sin diseño';

const TALLAS = [
    '3 meses',
    '6 meses',
    '9 meses',
    '1 año',
    '2 años',
    '4 años',
    '6 años',
    '8 años',
    '10 años',
    '12 años',
    '14 años',
    '16 años'
];

const ADULT = ['S', 'M', 'L', 'XL', 'XXL'];

const baseT = it =>
    it.prod == 'Salida'
        ? ['3 meses', '6 meses', '9 meses']
        : ['Vestido', 'Tutu'].includes(it.prod)
            ? TALLAS.slice(0, TALLAS.indexOf('12 años') + 1)
            : [
                ...TALLAS,
                ...(
                    ['Pijama', 'Abrigo', 'Camisa', 'Camisa sola'].includes(it.prod) ||
                        isOtro(it.prod)
                        ? ADULT
                        : []
                )
            ];

const op = (a, v) =>
    a.map(
        x => `<option${x == v ? ' selected' : ''}>${x}</option>`
    ).join('');

const tallaSel = (i, it) => {

    const l = baseT(it);

    if (it.talla && !l.includes(it.talla)) {
        l.unshift(it.talla);
    }

    return `
        <div>
            <label>Talla</label>

            <select onchange="si(${i},'talla',this.value,1)">
                <option value="">Elegir talla</option>
                ${op(l, it.talla)}
            </select>
        </div>
    `;
};

const gn = i =>
    ({
        'Niña': 'Mujer',
        'Niño': 'Hombre'
    })[i.gen] ||
    i.gen ||
    'Mujer';

const SINPE = '8536-7068';
const SINPE_N = 'Marlen Araya';

const mangaOps = it => {

    if (it.prod == 'Conjunto') {
        return gn(it) == 'Mujer'
            ? ['Normal', 'Tirante', 'Tirante ancho']
            : ['Normal', 'Tirante ancho'];
    }

    const o = ['Corta', 'Larga'];

    if (it.prod == 'Pijama' && gn(it) == 'Mujer' && ADULT.includes(it.talla)) {
        o.push('Tirante', 'Tirante ancho');
    }

    return o;
};

const mangaExtra = i =>
    i.prod == 'Conjunto' && i.manga && i.manga != 'Normal';

let R = [];
let E = null;
let tipo = '';

const tp = (r, i) =>
    i.tipo || r.tipo || 'Encargo';

const tot = r =>
    r.items.reduce(
        (a, i) => a + (+i.cant || 1) * (+i.precio || 0),
        0
    );

const pag = r =>
    (r.abonos || []).reduce(
        (a, b) => a + (+b.monto || 0),
        0
    );

const rtipo = r => {

    const s = [...new Set(r.items.map(i => tp(r, i)))];

    return s.length > 1
        ? 'Mixto'
        : (s[0] || r.tipo || '');
};

const METODOS = ['Efectivo', 'SINPE', 'Tarjeta'];

const mt = s => s == 'SINPE Móvil' ? 'SINPE' : s;

const hoy = () =>
    new Date().toISOString().slice(0, 10);

const vd = r => {

    const [y, mo, d] = r.fecha.split('-').map(Number);

    let t = new Date(y, mo + 1, d);

    if (t.getMonth() != (mo + 1) % 12) {
        t = new Date(y, mo + 2, 0);
    }

    return t;
};

const fv = r => {

    const t = vd(r);

    return (
        String(t.getDate()).padStart(2, '0') +
        '/' +
        String(t.getMonth() + 1).padStart(2, '0') +
        '/' +
        t.getFullYear()
    );
};

const vencido = r =>
    new Date() > new Date(vd(r).getTime() + 86400000);

const fh = r => {

    if (r.necesita != 'Sí' || !r.fent) {
        return '';
    }

    const [y, mo, d] = r.fent.split('-');

    let h = '';

    if (r.hent) {

        let [H, M] = r.hent.split(':').map(Number);

        const ap = H >= 12 ? 'p.m.' : 'a.m.';

        H = H % 12 || 12;

        h = ' a las ' + H + ':' + String(M).padStart(2, '0') + ' ' + ap;
    }

    return d + '/' + mo + '/' + y + h;
};


let LOCAL = false;

const LS = 'solopunto_registros';

const lsGet = () => {

    try {
        return JSON.parse(localStorage.getItem(LS)) || [];
    } catch (e) {
        return [];
    }
};

const lsSet = a =>
    localStorage.setItem(LS, JSON.stringify(a));

async function apiGet() {

    if (LOCAL) {
        return lsGet();
    }

    try {

        const r = await fetch('/api/registros');

        if (!r.ok) {
            throw new Error();
        }

        return await r.json();

    } catch (e) {

        LOCAL = true;

        return lsGet();
    }
}

async function apiSave(o) {

    if (LOCAL) {

        const a = lsGet();

        if (o.id == null) {
            o.id = a.reduce((x, y) => Math.max(x, +y.id || 0), 0) + 1;
        }

        const i = a.findIndex(x => x.id == o.id);

        if (i >= 0) {
            a[i] = o;
        } else {
            a.push(o);
        }

        lsSet(a);

        return o;
    }

    const resp = await fetch('/api/registros', {
        method: 'POST',
        body: JSON.stringify(o)
    });

    const txt = await resp.text();

    let r = null;

    try {
        r = JSON.parse(txt);
    } catch (e) { }

    if (!resp.ok || !r || r.id == null) {

        throw new Error(
            'Estado ' +
            resp.status +
            ': ' +
            (txt || '(respuesta vacía)').slice(0, 300)
        );
    }

    return r;
}

async function apiDel(id) {

    if (LOCAL) {
        return lsSet(lsGet().filter(x => x.id != id));
    }

    await fetch('/api/registros/' + id, { method: 'DELETE' });
}

async function cargar() {

    R = await apiGet();

    lista();
}


function lista() {

    const q = $('#q').value.toLowerCase();

    const f =
        R
            .filter(r =>
                (
                    !tipo ||
                    (
                        tipo == 'vencidos'
                            ? (tot(r) - pag(r) > 0 && vencido(r))
                            : r.items.some(i => tp(r, i) == tipo)
                    )
                ) &&
                (
                    String(r.cliente || '') +
                    String(r.tel || '') +
                    String(r.id || '')
                )
                    .toLowerCase()
                    .includes(q)
            )
            .sort((a, b) => b.id - a.id);

    $('#lista').innerHTML =
        f.length
            ? `
                <table>

                    <tr>
                        <th>Folio</th>
                        <th>Cliente</th>
                        <th>Tipo</th>
                        <th>Total</th>
                        <th>Debe</th>
                        <th></th>
                    </tr>

                    ${f.map(r => {

                const d = tot(r) - pag(r);

                return `
                            <tr>

                                <td>#${r.id}</td>

                                <td>

                                    ${r.cliente}

                                    <br>

                                    <small>${r.tel || ''}</small>

                                    ${d > 0
                        ? `
                                                <br>

                                                <small class="${vencido(r) ? 'deb' : ''}">
                                                    ${vencido(r) ? 'VENCIDO ' : 'Vence '}${fv(r)}
                                                </small>
                                            `
                        : ''
                    }

                                    ${fh(r)
                        ? `
                                                <br>

                                                <small>
                                                    Entrega: ${fh(r)}
                                                </small>
                                            `
                        : ''
                    }

                                </td>

                                <td>
                                    <span class="p">${rtipo(r)}</span>
                                </td>

                                <td>${m(tot(r))}</td>

                                <td class="${d > 0 ? 'deb' : 'pag'}">
                                    ${d > 0 ? m(d) : 'Pagado'}
                                </td>

                                <td>

                                    <div class="acc">

                                        <button onclick="ver(${r.id})">
                                            Abrir
                                        </button>

                                        <button class="s" onclick="imp(${r.id},'c')">
                                            🖨 Recibo cliente
                                        </button>

                                        <button class="s" onclick="imp(${r.id},'t')">
                                            🖨 Recibo tienda
                                        </button>

                                        <button class="fx-btn s" onclick="descargarFactura('png',${r.id})">
                                            ⬇ Descargar recibo
                                        </button>

                                    </div>

                                </td>

                            </tr>
                        `;

            }).join('')}

                </table>
            `
            : `
                <p>
                    No hay registros todavía.
                    Presiona "+ Nuevo pedido"
                    para empezar.
                </p>
            `;
}


document
    .querySelectorAll('.tab')
    .forEach(
        b =>
            b.onclick = () => {

                document
                    .querySelectorAll('.tab')
                    .forEach(x => x.classList.remove('on'));

                b.classList.add('on');

                tipo = b.dataset.t;

                lista();
            }
    );

$('#q').oninput = lista;

function nuevo() {

    E = {
        cliente: '',
        tel: '',
        nota: '',
        items: [],
        abonos: [],
        fecha: hoy(),
        necesita: 'No'
    };

    abrirForm();

    pedir();
}

function set(k, v) {
    E[k] = v;
}

function si(i, k, v, re) {

    E.items[i][k] = v;

    const it = E.items[i];

    if (k == 'prod') {

        if (['Vestido', 'Tutu'].includes(it.prod)) {
            it.gen = 'Mujer';
        }

        if (it.talla && !baseT(it).includes(it.talla)) {
            it.talla = '';
        }
    }

    if (k == 'prod' || k == 'gen') {

        if (it.bot && !botOps(it).includes(it.bot)) {
            it.bot = '';
        }
    }

    if (k == 'prod' || k == 'gen' || k == 'talla') {

        if (it.manga && !mangaOps(it).includes(it.manga)) {
            it.manga = '';
        }
    }

    if (k == 'todo') {

        it.tacab = v == 'Sí' ? 'Estampada' : 'Lisa';

        it.tdet = '';
    }

    if (re) {
        items();
    } else {
        sum();
    }
}

function sum() {

    const bx = $('#abono');

    if (bx) {

        bx.style.display =
            (tot(E) > 0 && pag(E) >= tot(E))
                ? 'none'
                : '';
    }

    const ab = Math.max(+E.ab0 || 0, 0);

    const ya = pag(E) + ab;

    const debe = tot(E) - ya;

    $('#sm').innerHTML = `
        Total:
        <b>${m(tot(E))}</b>

        · Abonado:
        ${m(ya)}

        · Debe:
        <b class="${debe > 0 ? 'deb' : 'pag'}">
            ${m(Math.max(debe, 0))}
        </b>

        ${debe < 0
            ? `
                    <br>

                    <span class="deb">
                        ⚠ Los abonos no pueden
                        pasar del total
                    </span>
                `
            : ''
        }
    `;
}

const inp = (
    i,
    k,
    l,
    t = 'text',
    ex = '',
    ph = ''
) =>
    `
        <div>

            <label>${l}</label>

            <input
                type="${t}"
                ${ex}
                placeholder="${ph}"
                value="${(E.items[i][k] ?? '').toString().replace(/"/g, '&quot;')}"
                oninput="si(${i},'${k}',this.value)"
            >

        </div>
    `;


const tl = (
    i,
    ka,
    kd,
    ops = ['Lisa', 'Estampada'],
    lc = 'Color de la tela'
) => {

    const it = E.items[i];

    const est = it[ka] == 'Estampada';

    return `
        <div>

            <label>Tipo de tela</label>

            <select onchange="si(${i},'${ka}',this.value,1)">
                ${op(ops, it[ka] || 'Lisa')}
            </select>

        </div>
    ` +

        inp(
            i,
            kd,
            est ? 'Diseño del estampado' : lc,
            'text',
            '',
            est ? 'Ej: flores, rayas, unicornios' : 'Ej: rosado, celeste'
        );
};


const gf = (i, it) => {

    if (sinTela(it.prod)) {
        return '';
    }

    if (it.prod == 'Tutu') {

        return `
            <div class="g">

                ${inp(i, 'det', 'Color del tutú', 'text', '', 'Ej: rosado')}

                <div>

                    <label>Cinta</label>

                    <select onchange="si(${i},'cinta',this.value)">
                        ${op(['Sin cinta', 'Con cinta'], it.cinta || 'Sin cinta')}
                    </select>

                </div>

            </div>
        `;
    }

    return `
        <div class="g">

            ${tl(
        i,
        'acab',
        'det',
        it.prod == 'Abrigo'
            ? ['Lisa', 'Estampada', 'Buzo']
            : undefined
    )}

        </div>
    `;
};


const sn = (i, k, l, it) => `
    <div>
        <label>${l}</label>
        <select onchange="si(${i},'${k}',this.value)">
            ${op(['No', 'Sí'], it[k] || 'No')}
        </select>
    </div>
`;

const salH = (i, it) => `
    <div class="sec">

        <h4>Detalles de la salida</h4>

        <div class="g">

            <div>

                <label>¿El cliente tiene referencia de cómo lo quiere?</label>

                <select onchange="si(${i},'ref',this.value,1)">
                    ${op(['Sí', 'No'], it.ref || 'Sí')}
                </select>

            </div>

        </div>

        ${(it.ref || 'Sí') == 'No'
        ? `
                    <div class="g">

                        ${sn(i, 'pij', '¿Va con pijama?', it)}
                        ${sn(i, 'gorro', '¿Va con gorro?', it)}
                        ${sn(i, 'cobija', '¿Va con cobija?', it)}
                        ${sn(i, 'sdis', '¿Va con diseño?', it)}

                    </div>

                    <div>

                        <label>Detalles</label>

                        <textarea
                            placeholder="Colores, tela, bordados, cualquier detalle..."
                            oninput="si(${i},'sdet',this.value)"
                        >${(it.sdet || '').replace(/&/g, '&amp;').replace(/</g, '&lt;')}</textarea>

                    </div>
                `
        : ''
    }

    </div>
`;


function itemH(it, i) {

    const head = `
        <h3>
            Prenda ${i + 1} · ${tp(E, it)}

            <button class="x" onclick="quitar(${i})">
                Quitar
            </button>
        </h3>
    `;

    const prodSel = `
        <div>

            <label>Producto</label>

            <select onchange="si(${i},'prod',this.value,1)">
                ${op(pl(it), it.prod)}
            </select>

        </div>

        ${isOtro(it.prod)
            ? inp(i, 'otro', '¿Cuál producto?')
            : ''
        }

        ${tallaSel(i, it)}
    `;

    if (tp(E, it) == 'Apartado') {

        return `
            <div class="it">

                ${head}

                <div class="sec">

                    <h4>Datos del apartado</h4>

                    <div class="g">
                        ${prodSel}
                    </div>

                </div>

                <div class="sec">

                    <h4>Cantidad y precio</h4>

                    <div class="g">

                        ${inp(i, 'cant', 'Cantidad', 'number', 'min=1')}

                        ${inp(i, 'precio', 'Precio por unidad', 'number', 'min=0 step=1')}

                    </div>

                    <div class="g">

                        ${inp(i, 'nota', 'Notas de esta prenda', 'text', '', 'Cualquier detalle extra')}

                    </div>

                </div>

            </div>
        `;
    }

    const t = TOP[it.prod];

    const b = BOT[it.prod];

    const bo = b && b.includes(' o ');

    const bc = bo;


    const g = (t || b) ? '' : gf(i, it);

    const disH = `

        <div>

            <label>¿Lleva diseño?</label>

            <select onchange="si(${i},'dis',this.value,1)">
                ${op(['Sin diseño', 'Con diseño'], it.dis || 'Sin diseño')}
            </select>

        </div>

        ${it.dis == 'Con diseño'
            ? `

                    ${inp(i, 'disd', 'Dibujo del diseño', 'text', '', 'Ej: osito, unicornio, nombre')}

                    <div>

                        <label>¿El cliente trae su propio diseño?</label>

                        <select onchange="si(${i},'pers',this.value)">
                            ${op(['No', 'Sí'], it.pers || 'No')}
                        </select>

                    </div>

                `
            : ''
        }
    `;

    return `
        <div class="it">

            ${head}

            <div class="sec">

                <h4>Datos generales</h4>

                <div class="g">

                    ${prodSel}

                    <div>

                        <label>Género</label>

                        <select onchange="si(${i},'gen',this.value,1)">
                            ${op(
        ['Vestido', 'Tutu'].includes(it.prod)
            ? ['Mujer']
            : ['Mujer', 'Hombre'],
        gn(it)
    )}
                        </select>

                    </div>

                </div>

            </div>

            ${it.prod == 'Salida' ? salH(i, it) : ''}

            ${g
            ? `
                        <div class="sec">

                            <h4>Tela y color</h4>

                            ${g}

                        </div>
                    `
            : ''
        }

            ${t
            ? (
                it.prod == 'Pijama'

                    ? `
                                <div class="sec">

                                    <h4>Parte de arriba</h4>

                                    <div class="g">

                                        <div>

                                            <label>¿Todo estampado?</label>

                                            <select onchange="si(${i},'todo',this.value,1)">
                                                ${op(['No', 'Sí'], it.todo || 'No')}
                                            </select>

                                        </div>

                                        ${it.todo == 'Sí'
                        ? inp(i, 'tdet', 'Diseño del estampado', 'text', '', 'Ej: flores, rayas, unicornios')
                        : tl(i, 'tacab', 'tdet', undefined, 'Color de la tela')
                    }

                                    </div>

                                </div>

                                <div class="sec">

                                    <h4>Mangas</h4>

                                    <div class="g">

                                        ${it.todo == 'Sí'
                        ? ''
                        : tl(i, 'macab', 'mdet', undefined, 'Color de las mangas')
                    }

                                        <div>

                                            <label>Manga</label>

                                            <select onchange="si(${i},'manga',this.value)">
                                                ${op(mangaOps(it), it.manga || 'Corta')}
                                            </select>

                                        </div>

                                    </div>

                                </div>

                                <div class="sec">

                                    <h4>Diseño</h4>

                                    <div class="g">
                                        ${disH}
                                    </div>

                                </div>
                            `

                    : `
                                <div class="sec">

                                    <h4>${t}</h4>

                                    <div class="g">

                                        ${tl(i, 'tacab', 'tdet', undefined, 'Color o fondo de la tela')}

                                        ${it.prod == 'Conjunto'
                        ? `
                                                <div>
                                                    <label>Manga / tirante</label>
                                                    <select onchange="si(${i},'manga',this.value)">
                                                        ${op(mangaOps(it), it.manga || 'Normal')}
                                                    </select>
                                                </div>
                                            `
                        : ''
                    }

                                    </div>

                                    <div class="g">
                                        ${disH}
                                    </div>

                                </div>
                            `
            )
            : ''
        }

            ${b
            ? `
                        <div class="sec">

                            <h4>${bo ? 'Parte de abajo' : b}</h4>

                            <div class="g">

                                ${bc
                ? `
                                            <div>

                                                <label>Parte de abajo</label>

                                                <select onchange="si(${i},'bot',this.value)">
                                                    ${op(botOps(it), it.bot || 'Short')}
                                                </select>

                                            </div>
                                        `
                : ''
            }

                                ${tl(i, 'bacab', 'bdet')}

                            </div>

                        </div>
                    `
            : ''
        }

            <div class="sec">

                <h4>Cantidad y precio</h4>

                <div class="g">

                    ${inp(i, 'cant', 'Cantidad', 'number', 'min=1')}

                    ${inp(i, 'precio', 'Precio por unidad', 'number', 'min=0 step=1')}

                </div>

                <div class="g">

                    ${inp(i, 'nota', 'Notas de esta prenda', 'text', '', 'Cualquier detalle extra')}

                </div>

            </div>

        </div>
    `;
}

function items() {

    $('#items').innerHTML = E.items.map(itemH).join('');

    sum();
}


function pedir() {

    $('#ask').innerHTML = `

        <div class="it">

            <b>¿Qué tipo de pedido es?</b>

            <div class="bar">

                <button onclick="addI('Encargo')">Encargo</button>

                <button onclick="addI('Apartado')">Apartado</button>

                ${E.items.length
            ? `
                            <button class="s" onclick="$('#ask').innerHTML=''">
                                Cancelar
                            </button>
                        `
            : ''
        }

            </div>

        </div>
    `;

    $('#ask').scrollIntoView({ block: 'center' });
}

function addI(t) {

    E.items.push({
        tipo: t,
        cant: 1,
        prod: PROD[0]
    });

    $('#ask').innerHTML = '';

    items();

    const l = document.querySelectorAll('#items .it');

    l[l.length - 1].scrollIntoView({ block: 'center' });
}

function quitar(i) {

    E.items.splice(i, 1);

    items();
}

function fentH() {

    const e = E;

    $('#fent').innerHTML = `

        <h3>Fecha de entrega</h3>

        <div class="g" style="align-items:start">

            <div style="display:flex;flex-direction:column;align-self:start">

                <label style="min-height:38px;display:flex;align-items:flex-start">
                    ¿El cliente lo necesita
                    para una fecha en específico?
                </label>

                <select onchange="set('necesita',this.value);fentH()">
                    ${op(['No', 'Sí'], e.necesita || 'No')}
                </select>

            </div>

            ${e.necesita == 'Sí'
            ? `

                        <div style="display:flex;flex-direction:column;align-self:start">

                            <label style="min-height:38px;display:flex;align-items:flex-start">
                                Fecha
                            </label>

                            <input
                                type="date"
                                min="${hoy()}"
                                value="${e.fent || ''}"
                                oninput="set('fent',this.value)"
                                onchange="set('fent',this.value)"
                            >

                        </div>

                        <div style="display:flex;flex-direction:column;align-self:start">

                            <label style="min-height:38px;display:flex;align-items:flex-start">
                                Hora
                            </label>

                            <input
                                type="time"
                                value="${e.hent || ''}"
                                oninput="set('hent',this.value)"
                                onchange="set('hent',this.value)"
                            >

                        </div>

                    `
            : ''
        }

        </div>
    `;
}


function abrirForm() {

    const e = E;

    $('#dlg').innerHTML = `

        <h2>
            ${e.id ? 'Editar pedido #' + e.id : 'Nuevo pedido'}
        </h2>

        <div class="g">

            <div>

                <label>Cliente</label>

                <input
                    value="${e.cliente || ''}"
                    oninput="set('cliente',this.value)"
                >

            </div>

            <div>

                <label>Teléfono</label>

                <input
                    value="${e.tel || ''}"
                    oninput="set('tel',this.value)"
                >

            </div>

        </div>

        <div id="items"></div>

        <div id="ask"></div>

        <button class="s" onclick="pedir()">
            + Agregar pedido
        </button>

        <div class="it" id="fent"></div>

        <div class="it" id="abono">

            <h3>Abonar</h3>

            <div class="g">

                <div>

                    <label>Monto del abono</label>

                    <input
                        type="number"
                        min="0"
                        step="1"
                        oninput="E.ab0=this.value;sum()"
                    >

                </div>

                <div>

                    <label>Método de pago</label>

                    <select onchange="E.ab0n=this.value">
                        ${op(METODOS)}
                    </select>

                </div>

            </div>

        </div>

        <div class="tot" id="sm"></div>

        <div class="bar" style="justify-content:flex-end">

            <button class="s" onclick="$('#dlg').close()">
                Cancelar
            </button>

            <button onclick="guardar()">
                Guardar y ver recibo
            </button>

        </div>
    `;

    items();

    fentH();

    if (!$('#dlg').open) {
        $('#dlg').showModal();
    }
}


async function guardar() {

    if (!E.cliente.trim()) {
        return alert('Escribe el nombre del cliente');
    }

    if (!E.items.length) {
        return alert('Agrega al menos una prenda');
    }

    if (E.items.some(i => !i.talla)) {
        return alert('Elige la talla de cada prenda');
    }

    if (E.items.some(i => !(+i.precio > 0))) {
        return alert('Todas las prendas necesitan un precio mayor a 0');
    }

    if (E.items.some(i => !(+i.cant >= 1))) {
        return alert('La cantidad debe ser 1 o más');
    }

    if (E.necesita == 'Sí' && !E.fent) {
        return alert('Elige la fecha en que el cliente necesita el pedido');
    }

    if (E.necesita != 'Sí') {

        delete E.fent;
        delete E.hent;
    }

    const ab = +E.ab0 || 0;

    if (ab < 0) {
        return alert('El abono no puede ser negativo');
    }

    if (pag(E) + ab > tot(E)) {

        return alert(
            'Los abonos (' +
            m(pag(E) + ab) +
            ') no pueden pasar del total (' +
            m(tot(E)) +
            ').\nLo máximo que se puede abonar ahora es ' +
            m(Math.max(tot(E) - pag(E), 0))
        );
    }

    E.items.forEach(i => {

        i.tipo = tp(E, i);

        if (i.prod == 'Pijama' && i.todo == null) {
            i.todo = 'No';
        }
    });

    E.tipo = rtipo(E);

    if (+E.ab0 > 0) {

        E.abonos = E.abonos || [];

        E.abonos.push({
            f: hoy(),
            monto: +E.ab0,
            metodo: E.ab0n || METODOS[0]
        });
    }

    delete E.ab0;
    delete E.ab0n;

    try {

        const r = await apiSave(E);

        await cargar();

        ver(r.id);

    } catch (err) {

        alert('No se pudo guardar.\n' + err.message);
    }
}



function desc(r, i) {

    if (tp(r, i) == 'Apartado') {

        const partes = [`Talla: ${i.talla || '—'}`];

        if (i.nota) {
            partes.push(`Nota: ${i.nota}`);
        }

        return `
            <div class="detalle-prenda">

                <strong>
                    Apartado: ${pn(i)}
                </strong>

                ${partes.map(x => `<div>${x}</div>`).join('')}

            </div>
        `;
    }

    const t = TOP[i.prod];

    const b = BOT[i.prod];

    const detalles = [];

    detalles.push(`Talla: ${i.talla || '—'}`);

    detalles.push(`Género: ${gn(i)}`);

    if (i.prod == 'Salida') {
        salL(i).forEach(([k, v]) => detalles.push(`${k}: ${v}`));
    }

    if (!t && !b && !sinTela(i.prod)) {

        if (i.prod == 'Tutu') {

            detalles.push(`Color: ${i.det || '—'}`);

            detalles.push(`Cinta: ${i.cinta || 'Sin cinta'}`);

        } else {

            detalles.push(`Tela: ${cap(telaG(i))}`);
        }
    }

    if (t) {

        if (i.prod == 'Pijama' && i.todo != null) {

            detalles.push(`Todo estampado: ${i.todo}`);

            if (i.todo == 'Sí') {

                detalles.push(`Parte de arriba: ${cap(tela('Estampada', i.tdet))}`);

                detalles.push(`Mangas: Igual que la parte de arriba${mg(i)}`);

            } else {

                detalles.push(`Parte de arriba: ${cap(tela(i.tacab, i.tdet))}`);

                detalles.push(`Mangas: ${cap(tela(i.macab, i.mdet))}${mg(i)}`);
            }

        } else if (i.prod == 'Pijama') {

            const telaArriba = cap(telaT(i));

            const partes = telaArriba.split(/,\s*color\/fondo\s*/i);

            detalles.push(`Mangas: ${partes[0]}${mg(i)}`);

            if (partes[1]) {
                detalles.push(`Color/Fondo: ${cap(partes[1])}`);
            }

        } else {

            const telaArriba = cap(telaT(i));

            const partes = telaArriba.split(/,\s*color\/fondo\s*/i);

            detalles.push(`${t}: ${partes[0]}`);

            if (mangaExtra(i)) {
                detalles.push(`Manga: ${i.manga}`);
            }

            if (partes[1]) {
                detalles.push(`Color/Fondo: ${cap(partes[1])}`);
            }
        }

        if (i.dis == 'Con diseño') {

            detalles.push(`Diseño: ${i.disd || 'Sí'}`);

            if (i.pers == 'Sí') {
                detalles.push('Personalización: Sí, diseño proporcionado por el cliente');
            }

        } else {

            detalles.push('Diseño: Sin diseño');
        }
    }

    if (b) {

        detalles.push(
            `${bn(i)}: ${cap(telaB(i))}${i.botd ? ' (' + i.botd + ')' : ''}`
        );
    }

    if (i.nota) {
        detalles.push(`Nota: ${i.nota}`);
    }

    return `
        <div class="detalle-prenda">

            <strong>
                Encargo: ${pn(i)}
            </strong>

            ${detalles.map(x => `<div>${x}</div>`).join('')}

        </div>
    `;
}


function ver(id) {

    const r = R.find(x => x.id == id);

    if (!r) {
        return alert('No se encontró el pedido.');
    }

    E = r;

    const d = tot(r) - pag(r);

    $('#dlg').innerHTML = `

        <h2>Creaciones Solo Punto</h2>

        <p>

            ${rtipo(r)}
            #${r.id}
            · ${r.fecha}

            <br>

            <b>${r.cliente}</b>

            ${r.tel || ''}

            ${d > 0
            ? `
                        <br>

                        Se guarda 2 meses,
                        hasta el

                        <b class="${vencido(r) ? 'deb' : ''}">
                            ${fv(r)}
                        </b>

                        ${vencido(r) ? ' (VENCIDO)' : ''}
                    `
            : ''
        }

        </p>

        ${fh(r)
            ? `
                    <div class="it">

                        <b>
                            Lo necesita para:
                            ${fh(r)}
                        </b>

                    </div>
                `
            : ''
        }

        <table>

            ${r.items.map(
            i => `
                    <tr>

                        <td>${desc(r, i)}</td>

                        <td>
                            ${i.cant || 1}
                            ×
                            ${m(i.precio)}
                        </td>

                        <td>
                            ${m((i.cant || 1) * i.precio)}
                        </td>

                    </tr>
                `
        ).join('')}

        </table>

        ${r.nota
            ? `
                    <p>
                        Notas:
                        ${r.nota}
                    </p>
                `
            : ''
        }

        <p class="tot">

            Total
            ${m(tot(r))}

            <br>

            Abonos
            ${m(pag(r))}

            <br>

            <b class="${d > 0 ? 'deb' : 'pag'}">
                ${d > 0 ? 'Saldo ' + m(d) : 'PAGADO'}
            </b>

        </p>

        ${(r.abonos || []).length
            ? `
                    <b>Abonos</b>

                    <table>

                        ${r.abonos.map(
                a => `
                                <tr>

                                    <td>${a.f}</td>

                                    <td>${mt(a.metodo || a.nota || '')}</td>

                                    <td>${m(a.monto)}</td>

                                </tr>
                            `
            ).join('')}

                    </table>
                `
            : ''
        }

        <div class="no">

            ${d > 0
            ? `
                        <div class="g">

                            <div>

                                <label>Nuevo abono</label>

                                <input id="ab" type="number" min="0" step="1">

                            </div>

                            <div>

                                <label>Método de pago</label>

                                <select id="an">
                                    ${op(METODOS)}
                                </select>

                            </div>

                            <div>

                                <label>&nbsp;</label>

                                <button onclick="abonar()">
                                    Registrar abono
                                </button>

                            </div>

                        </div>
                    `
            : ''
        }

            <div class="bar">

                <button class="s" onclick="abrirForm()">
                    Editar
                </button>

                <button class="x" onclick="borrar(${r.id})">
                    Eliminar
                </button>

                <button
                    class="s"
                    onclick="$('#dlg').close()"
                    style="margin-left:auto"
                >
                    Cerrar
                </button>

            </div>

        </div>
    `;

    if (!$('#dlg').open) {
        $('#dlg').showModal();
    }
}

const rRow = (a, b, c = '') =>
    `<div class="r ${c}">
        <span>${a}</span>
        <span>${b}</span>
    </div>`;

const rBox = (t, v, c = '') =>
    `<div class="box ${c}">
        <small>${t}</small>
        <b>${v}</b>
    </div>`;

const rPill = r =>
    `<div class="c">
        <span class="pill">${rtipo(r)}</span>
    </div>

    <div class="c folio">
        N.º ${r.id}
    </div>`;

const rEstado = r =>
    tot(r) - pag(r) > 0
        ? rBox('Debe', m(tot(r) - pag(r)), 'st')
        : rBox('', '✓ PAGADO', 'st');

const rEnt = r =>
    fh(r)
        ? rBox('Entrega', fh(r))
        : '';

function recCliente(r) {

    const d = tot(r) - pag(r);

    const ent = rEnt(r);

    const logo = `
        <div class="c logo-box">
            <img src="${LOGO}" alt="Logo de Creaciones Solo Punto">
        </div>
    `;

    const itsC =
        r.items.map(
            i => {

                const n = i.cant || 1;

                const ap = tp(r, i) == 'Apartado';

                return `
                    <div class="it2">

                        <div class="pn">
                            ${n} × ${pn(i)}
                        </div>

                        <div class="dt">

                            ${ap ? 'Apartado · ' : ''}

                            Talla
                            ${i.talla || '-'}

                            ${ap ? '' : ' · ' + gn(i)}

                        </div>

                        ${rRow('Precio', m(n * i.precio))}

                    </div>
                `;
            }
        )
            .join('<hr class="d">');

    return `

        ${logo}

        <div class="c ttl">
            Creaciones Solo Punto
        </div>

        ${rPill(r)}

        <div class="c fch">
            ${r.fecha}
        </div>

        <div class="c tel">
            Tel. 6234-2975
        </div>

        <div class="c sinpe">
            SINPE: ${SINPE}<br>${SINPE_N}
        </div>

        ${ent ? '<hr>' + ent : ''}

        <hr>

        <div class="lbl">Cliente</div>

        <div class="nom">${r.cliente}</div>

        ${r.tel ? `<div>Tel. ${r.tel}</div>` : ''}

        <hr>

        ${itsC}

        <hr>

        ${rRow('Total', m(tot(r)), 'big')}

        ${pag(r) > 0 ? rRow('Abonado', m(pag(r))) : ''}

        <hr>

        ${rEstado(r)}

        ${d > 0 ? '<hr>' + rBox('Se guarda 2 meses · vence', fv(r)) : ''}

        <hr>

        <div class="c ty">
            ¡Gracias por su compra!
        </div>

        <div class="c cute">
            Hecho con cariño
        </div>
    `;
}


function imprimir(modo) {

    modo = modo == 't' ? 't' : 'c';

    const r = E;

    const ent = rEnt(r);

    const ln = (l, v) =>
        `<span class="ln"><b>${l}:</b> ${v}</span>`;

    const sub = t =>
        `<div class="sub">${t}</div>`;

    const telaL = (a, d) =>
        a == 'Estampada'
            ? ln('Tela', 'Estampada') +
            (d ? ln('Diseño del estampado', d) : '')
            : ln('Tela', a == 'Buzo' ? 'Buzo' : 'Lisa') +
            (d ? ln('Color', d) : '');


    const itsT =
        r.items.map(
            (i, k) => {

                const n = i.cant || 1;

                const top = `
                    <div class="ph">

                        ${tp(r, i) == 'Apartado' ? 'Apartado' : 'Encargo'}

                        ${k + 1}

                    </div>
                `;

                const precio =
                    `<div class="prl">${n > 1 ? ln('Precio unidad', m(i.precio)) : ''}${ln('Precio', m(n * i.precio))}</div>`;

                if (tp(r, i) == 'Apartado') {

                    return `<div class="it2">${top}${ln('Producto', pn(i))}${ln('Cantidad', n)}${ln('Talla', i.talla || '-')}${i.nota ? ln('Nota', i.nota) : ''}${precio}</div>`;
                }

                const t = TOP[i.prod];

                const b = BOT[i.prod];

                let h =
                    top +
                    ln('Producto', pn(i)) +
                    ln('Cantidad', n) +
                    ln('Talla', i.talla || '-') +
                    ln('Género', gn(i));

                if (i.prod == 'Salida') {
                    salL(i).forEach(([k2, v]) => { h += ln(k2, v); });
                }

                if (!sinTela(i.prod) && !t && !b) {

                    h += sub(i.prod == 'Tutu' ? 'Tutú' : 'Tela y color');

                    h +=
                        i.prod == 'Tutu'
                            ? ln('Color', i.det || '—') +
                            ln('Cinta', i.cinta || 'Sin cinta')
                            : telaL(i.acab, i.det);
                }

                if (t) {

                    const pij = i.prod == 'Pijama';

                    if (pij && i.todo != null) {

                        h += sub('Parte de arriba');

                        h += ln('Todo estampado', i.todo);

                        if (i.todo == 'Sí') {

                            h += telaL('Estampada', i.tdet);

                            h += sub('Mangas');

                            h += ln('Tela', 'Igual que la parte de arriba');

                        } else {

                            h += telaL(i.tacab, i.tdet);

                            h += sub('Mangas');

                            h += telaL(i.macab, i.mdet);
                        }

                        h += ln('Manga', i.manga || 'Corta');

                        h += sub('Diseño');

                    } else {

                        h += sub(pij ? 'Mangas' : t);

                        h += telaL(i.tacab || i.acab, i.tdet ?? i.det);

                        if (mangaExtra(i)) {
                            h += ln('Manga', i.manga);
                        }

                        if (pij) {

                            h += ln('Manga', i.manga || 'Corta');

                            h += sub('Frente');
                        }
                    }

                    h +=
                        i.dis == 'Con diseño'
                            ? ln('Diseño', 'Sí') +
                            (i.disd ? ln('Dibujo', i.disd) : '') +
                            (i.pers == 'Sí' ? ln('Diseño del cliente', 'Sí') : '')
                            : ln('Diseño', 'No');
                }

                if (b) {

                    h +=
                        sub(bn(i)) +
                        telaL(i.bacab || i.acab, i.bdet ?? i.det) +
                        (i.botd ? ln('Detalle', i.botd) : '');
                }

                if (i.nota) {

                    h +=
                        sub('Notas') +
                        `<div>${i.nota}</div>`;
                }

                return `
                    <div class="it2">

                        ${h}

                        ${precio}

                    </div>
                `;
            }
        )
            .join('<hr class="d">');


    const recT = `

        ${rPill(r)}

        <hr>

        <div>${ln('Fecha', r.fecha)}</div>

        ${r.tel ? `<div>${ln('Teléfono', r.tel)}</div>` : ''}

        <div class="lbl">Cliente</div>

        <div class="nom gr">${r.cliente}</div>

        ${ent ? '<hr>' + ent : ''}

        <hr>

        ${itsT}

        <hr>

        ${r.nota
            ? sub('Notas del pedido') +
            `<div>${r.nota}</div>
                  <hr>`
            : ''
        }

        ${rRow('Total', m(tot(r)), 'big')}

        ${(r.abonos || []).length
            ? sub('Abonos') +
            r.abonos
                .map(
                    a =>
                        rRow(
                            a.f.slice(8) + '/' + a.f.slice(5, 7),
                            m(a.monto)
                        ) +
                        (
                            (a.metodo || a.nota)
                                ? `
                                        <div class="dt" style="margin:0 0 3px">
                                            ${mt(a.metodo || a.nota)}
                                        </div>
                                    `
                                : ''
                        )
                )
                .join('')
            : ''
        }

        ${rRow('Abonado', m(pag(r)))}

        <hr>

        ${rEstado(r)}
    `;


    $('#rec').innerHTML =
        modo == 't'
            ? recT
            : recCliente(r);


    let ya = 0;

    const go = () => {

        if (!ya) {

            ya = 1;

            print();
        }
    };

    const g = $('#rec img');

    if (!g || g.complete) {

        go();

    } else {

        g.onload = g.onerror = go;

        setTimeout(go, 1500);
    }
}

async function descargarFactura(formato, id) {

    if (formato !== 'png') {
        return;
    }

    const r = R.find(x => x.id == id);

    if (!r) {
        return alert('No se encontró el pedido.');
    }

    if (typeof html2canvas !== 'function') {

        return alert(
            'No se puede descargar la imagen porque falta la librería de captura.'
        );
    }

    const anterior = E;

    E = r;

    try {

        const rec = $('#rec');

        const oldDisplay = rec.style.display;
        const oldPosition = rec.style.position;
        const oldLeft = rec.style.left;
        const oldTop = rec.style.top;
        const oldWidth = rec.style.width;

        rec.innerHTML = recCliente(r);

        rec.style.display = 'block';
        rec.style.position = 'fixed';
        rec.style.left = '-10000px';
        rec.style.top = '0';
        rec.style.width = '50mm';

        const img = rec.querySelector('img');

        if (img && !img.complete) {

            await new Promise(
                resolve => {

                    img.onload = img.onerror = resolve;

                    setTimeout(resolve, 1500);
                }
            );
        }

        const canvas = await html2canvas(rec, {
            backgroundColor: '#ffffff',
            scale: 3,
            useCORS: true
        });

        const enlace = document.createElement('a');

        enlace.download = `Recibo_${r.id}.png`;

        enlace.href = canvas.toDataURL('image/png');

        enlace.click();

        rec.style.display = oldDisplay;
        rec.style.position = oldPosition;
        rec.style.left = oldLeft;
        rec.style.top = oldTop;
        rec.style.width = oldWidth;

    } catch (err) {

        console.error(err);

        alert('No se pudo generar la imagen del recibo.');

    } finally {

        E = anterior;
    }
}


async function abonar() {

    const v = +$('#ab').value;

    if (!(v > 0)) {
        return alert('Escribe el monto');
    }

    if (pag(E) + v > tot(E)) {

        return alert(
            'El abono pasa del total. Lo que debe es ' +
            m(tot(E) - pag(E))
        );
    }

    E.abonos = E.abonos || [];

    E.abonos.push({
        f: hoy(),
        monto: v,
        metodo: $('#an').value
    });

    try {

        await apiSave(E);

    } catch (err) {

        return alert('No se pudo guardar el abono.\n' + err.message);
    }

    await cargar();

    ver(E.id);
}


function imp(id, modo) {

    const r = R.find(x => x.id == id);

    if (!r) {
        return;
    }

    E = r;

    imprimir(modo);
}


async function borrar(id) {

    if (!confirm('¿Eliminar este registro?')) {
        return;
    }

    await apiDel(id);

    $('#dlg').close();

    await cargar();
}

cargar();

setInterval(
    () => {

        if (!$('#dlg').open) {
            cargar();
        }

    },
    15000
);