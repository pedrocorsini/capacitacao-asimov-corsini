(() => {
    const root = document.documentElement;
    const themeColor = document.querySelector('meta[name="theme-color"]');

    const applyTheme = (light) => {
        root.dataset.theme = light ? 'light' : 'dark';
        themeColor.content = light ? '#f4f5ef' : '#161c1a';
    };

    let light = false;
    try {
        light = localStorage.getItem('portfolio-theme') === 'light';
    } catch {
        // O botão continua funcionando quando o navegador bloqueia o armazenamento.
    }
    applyTheme(light);

    document.addEventListener('DOMContentLoaded', () => {
        const toggle = document.querySelector('.theme-toggle');
        const updateToggle = () => {
            toggle.setAttribute('aria-pressed', String(light));
            toggle.title = light ? 'Ativar modo escuro' : 'Ativar modo claro';
        };
        toggle.hidden = false;
        updateToggle();

        toggle.addEventListener('click', () => {
            light = !light;
            applyTheme(light);
            updateToggle();
            try {
                localStorage.setItem('portfolio-theme', light ? 'light' : 'dark');
            } catch {
                // Mantém a escolha nesta página mesmo sem persistência disponível.
            }
        });
    });
})();
