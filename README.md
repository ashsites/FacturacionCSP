# Facturación – Creaciones Solo Punto

Aplicación de escritorio para Windows que sirve para llevar el control de los apartados y encargos de Creaciones Solo Punto. Permite registrar pedidos con sus clientes, artículos, fecha de entrega y abonos, y ver en todo momento cuánto se ha pagado y cuánto queda pendiente.

Desde la pantalla principal se crean pedidos nuevos, se filtran por Encargos, Apartados o Vencidos, y se buscan por nombre del cliente, teléfono o folio. Los pedidos con fecha pasada y saldo pendiente se marcan como vencidos para no perderlos de vista. Cada pedido admite abonos sucesivos, con validación para que no superen el total.

La app genera comprobantes listos para imprimir, en formato carta o en formato de tiquete para impresora térmica, y también puede descargar la factura como imagen PNG para compartirla con el cliente.

Los datos se guardan localmente en el equipo, por lo que no se necesita servidor ni cuenta alguna. Para descargar la factura como imagen se requiere conexión a internet, y las fuentes de Google Fonts también se cargan en línea.

Está construida con Electron y JavaScript puro. Para ejecutarla en modo desarrollo se corre `npm install` y luego `npm start`, y para generar el instalador de Windows se usa `npm run build`, que deja el resultado en la carpeta `dist`.
