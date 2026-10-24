(() => {
    const aviso = document.createElement('div');

    aviso.setAttribute('popover', 'manual');

    aviso.style.cssText =
        'position:fixed;inset:auto auto 24px 50%;transform:translateX(-50%);' +
        'margin:0;max-width:90vw;padding:14px 20px;border:0;border-radius:14px;' +
        'background:#4a4650;color:#fff;font:600 15px/1.4 Nunito,Arial,sans-serif;' +
        'white-space:pre-line;text-align:center;box-shadow:0 8px 30px rgba(0,0,0,.3)';

    document.body.appendChild(aviso);

    if (typeof aviso.showPopover !== 'function') {
        aviso.style.display = 'none';
    }

    let tAviso;

    window.alert = msg => {

        aviso.textContent = String(msg ?? '');

        clearTimeout(tAviso);

        if (typeof aviso.showPopover === 'function') {

            try {
                aviso.hidePopover();
            } catch (e) {}

            aviso.showPopover();

            tAviso = setTimeout(() => {

                try {
                    aviso.hidePopover();
                } catch (e) {}

            }, 4500);

            return;
        }
        const dlg = document.getElementById('dlg');

        (dlg && dlg.open ? dlg : document.body).appendChild(aviso);

        aviso.style.display = 'block';

        aviso.style.zIndex = '99999';

        tAviso = setTimeout(() => {
            aviso.style.display = 'none';
        }, 4500);
    };

    let pendiente = null;

    window.borrar = async function (id) {

        const btn =
            (window.event && window.event.target) || null;

        if (pendiente !== id) {

            pendiente = id;

            if (btn) {
                btn.textContent = '¿Seguro? Toca otra vez';
            }

            setTimeout(() => {

                if (pendiente === id) {

                    pendiente = null;

                    if (btn) {
                        btn.textContent = 'Eliminar';
                    }
                }

            }, 3500);

            return;
        }

        pendiente = null;

        await apiDel(id);

        $('#dlg').close();

        await cargar();
    };

    const recuperar = () => {

        setTimeout(() => {

            window.blur();

            window.focus();

        }, 50);
    };

    window.addEventListener('afterprint', recuperar);

    document.addEventListener('mousedown', e => {

        const el = e.target.closest('input, textarea, select');

        if (!el) {
            return;
        }

        setTimeout(() => {

            if (document.activeElement !== el) {
                el.focus();
            }

        }, 0);

    }, true);

})();