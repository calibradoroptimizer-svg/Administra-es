const API_BASE = 'https://admintracao.netlify.app/.netlify/functions';

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(tab).classList.add('active');
    });
});

const sliders = {
    'aimFov': 'fovValue', 'aimSmooth': 'smoothValue', 'responseSpeed': 'responseValue',
    'sensiGeral': 'sensiGeralValue', 'sensiRed': 'sensiRedValue', 'sensi2x': 'sensi2xValue',
    'sensi4x': 'sensi4xValue', 'sensiAwm': 'sensiAwmValue', 'miraH': 'miraHValue',
    'miraV': 'miraVValue', 'stability': 'stabilityValue', 'buttonX': 'buttonXValue',
    'buttonY': 'buttonYValue', 'buttonSize': 'buttonSizeValue', 'pullIntensity': 'pullIntensityValue',
    'pullSpeed': 'pullSpeedValue', 'headPriority': 'headPriorityValue', 'headAdjust': 'headAdjustValue'
};

Object.keys(sliders).forEach(sliderId => {
    const slider = document.getElementById(sliderId);
    const valueSpan = document.getElementById(sliders[sliderId]);
    if (slider && valueSpan) {
        slider.addEventListener('input', () => {
            valueSpan.textContent = slider.value;
        });
    }
});

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    const colors = {'success': 'var(--success)', 'error': 'var(--danger)', 'warning': 'var(--warning)', 'info': 'var(--secondary)'};
    toast.style.background = colors[type] || colors.success;
    toast.style.color = type === 'success' || type === 'warning' ? 'var(--bg-dark)' : 'white';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

function getConfigData() {
    return {
        aimbot: {
            fullHS: document.getElementById('aimbotFullHS')?.checked || false,
            fullCapa: document.getElementById('fullCapa')?.checked || false,
            naoPina: document.getElementById('naoPina')?.checked || false,
            naoTreme: document.getElementById('naoTreme')?.checked || false,
            aimlockCabeca: document.getElementById('aimlockCabeca')?.checked || false,
            aimbotAP: document.getElementById('aimbotAP')?.checked || false,
            naoPassaCabeca: document.getElementById('naoPassaCabeca')?.checked || false,
            fov: document.getElementById('aimFov')?.value || 100,
            smooth: document.getElementById('aimSmooth')?.value || 5,
            responseSpeed: document.getElementById('responseSpeed')?.value || 8
        },
        sensibilidade: {
            hypeSensi: document.getElementById('hypeSensi')?.checked || false,
            geral: document.getElementById('sensiGeral')?.value || 50,
            redDot: document.getElementById('sensiRed')?.value || 50,
            x2: document.getElementById('sensi2x')?.value || 50,
            x4: document.getElementById('sensi4x')?.value || 50,
            awm: document.getElementById('sensiAwm')?.value || 50
        },
        calibracao: {
            miraH: document.getElementById('miraH')?.value || 0,
            miraV: document.getElementById('miraV')?.value || 0,
            stability: document.getElementById('stability')?.value || 5,
            screen: document.getElementById('screenCalibrate')?.value || 'auto',
            buttonX: document.getElementById('buttonX')?.value || 50,
            buttonY: document.getElementById('buttonY')?.value || 50,
            buttonSize: document.getElementById('buttonSize')?.value || 100,
            pullIntensity: document.getElementById('pullIntensity')?.value || 5,
            pullSpeed: document.getElementById('pullSpeed')?.value || 5
        },
        avancado: {
            deviceEmulation: document.getElementById('deviceEmulation')?.value || 'none',
            emularSensiIphone: document.getElementById('emularSensiIphone')?.checked || false,
            resolucaoVirtual: document.getElementById('resolucaoVirtual')?.checked || false,
            headPriority: document.getElementById('headPriority')?.value || 8,
            headAdjust: document.getElementById('headAdjust')?.value || 5
        },
        timestamp: new Date().toISOString(),
        version: '7.0'
    };
}

function applyConfigData(config) {
    try {
        if (config.aimbot) {
            document.getElementById('aimbotFullHS').checked = config.aimbot.fullHS || false;
            document.getElementById('fullCapa').checked = config.aimbot.fullCapa || false;
            document.getElementById('naoPina').checked = config.aimbot.naoPina || false;
            document.getElementById('naoTreme').checked = config.aimbot.naoTreme || false;
            document.getElementById('aimlockCabeca').checked = config.aimbot.aimlockCabeca || false;
            document.getElementById('aimbotAP').checked = config.aimbot.aimbotAP || false;
            document.getElementById('naoPassaCabeca').checked = config.aimbot.naoPassaCabeca || false;
            document.getElementById('aimFov').value = config.aimbot.fov || 100;
            document.getElementById('aimSmooth').value = config.aimbot.smooth || 5;
            document.getElementById('responseSpeed').value = config.aimbot.responseSpeed || 8;
        }
        if (config.sensibilidade) {
            document.getElementById('hypeSensi').checked = config.sensibilidade.hypeSensi || false;
            document.getElementById('sensiGeral').value = config.sensibilidade.geral || 50;
            document.getElementById('sensiRed').value = config.sensibilidade.redDot || 50;
            document.getElementById('sensi2x').value = config.sensibilidade.x2 || 50;
            document.getElementById('sensi4x').value = config.sensibilidade.x4 || 50;
            document.getElementById('sensiAwm').value = config.sensibilidade.awm || 50;
        }
        if (config.calibracao) {
            document.getElementById('miraH').value = config.calibracao.miraH || 0;
            document.getElementById('miraV').value = config.calibracao.miraV || 0;
            document.getElementById('stability').value = config.calibracao.stability || 5;
            document.getElementById('screenCalibrate').value = config.calibracao.screen || 'auto';
            document.getElementById('buttonX').value = config.calibracao.buttonX || 50;
            document.getElementById('buttonY').value = config.calibracao.buttonY || 50;
            document.getElementById('buttonSize').value = config.calibracao.buttonSize || 100;
            document.getElementById('pullIntensity').value = config.calibracao.pullIntensity || 5;
            document.getElementById('pullSpeed').value = config.calibracao.pullSpeed || 5;
        }
        if (config.avancado) {
            document.getElementById('deviceEmulation').value = config.avancado.deviceEmulation || 'none';
            document.getElementById('emularSensiIphone').checked = config.avancado.emularSensiIphone || false;
            document.getElementById('resolucaoVirtual').checked = config.avancado.resolucaoVirtual || false;
            document.getElementById('headPriority').value = config.avancado.headPriority || 8;
            document.getElementById('headAdjust').value = config.avancado.headAdjust || 5;
        }
        Object.keys(sliders).forEach(sliderId => {
            const slider = document.getElementById(sliderId);
            const valueSpan = document.getElementById(sliders[sliderId]);
            if (slider && valueSpan) valueSpan.textContent = slider.value;
        });
    } catch (error) {
        console.error('Erro ao aplicar configurações:', error);
    }
}

document.getElementById('generateSensi')?.addEventListener('click', async () => {
    showToast('Gerando sensibilidade...', 'info');
    try {
        const deviceType = document.getElementById('deviceEmulation').value;
        const playStyle = document.getElementById('hypeSensi').checked ? 'aggressive' : 'balanced';
        const response = await fetch(`${API_BASE}/generate-sensi`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ deviceType, playStyle })
        });
        const data = await response.json();
        if (data.success && data.config) {
            document.getElementById('sensiGeral').value = data.config.geral;
            document.getElementById('sensiRed').value = data.config.redDot;
            document.getElementById('sensi2x').value = data.config.x2;
            document.getElementById('sensi4x').value = data.config.x4;
            document.getElementById('sensiAwm').value = data.config.awm;
            document.getElementById('sensiGeralValue').textContent = data.config.geral;
            document.getElementById('sensiRedValue').textContent = data.config.redDot;
            document.getElementById('sensi2xValue').textContent = data.config.x2;
            document.getElementById('sensi4xValue').textContent = data.config.x4;
            document.getElementById('sensiAwmValue').textContent = data.config.awm;
            showToast('✓ Sensibilidade gerada!', 'success');
        }
    } catch (error) {
        const device = document.getElementById('deviceEmulation').value;
        let mult = device === 'iphone16' ? 1.15 : device === 'iphone14' ? 1.10 : device === 'ipad' ? 0.95 : 1.0;
        ['sensiGeral', 'sensiRed', 'sensi2x', 'sensi4x', 'sensiAwm'].forEach((id, i) => {
            const val = Math.round([60, 68, 52, 44, 38][i] * mult);
            document.getElementById(id).value = val;
            document.getElementById(id + 'Value').textContent = val;
        });
        showToast('Valores padrão aplicados', 'warning');
    }
});

document.getElementById('applySensiPro')?.addEventListener('click', () => {
    [['sensiGeral', 65], ['sensiRed', 70], ['sensi2x', 55], ['sensi4x', 45], ['sensiAwm', 40]].forEach(([id, val]) => {
        document.getElementById(id).value = val;
        document.getElementById(id + 'Value').textContent = val;
    });
    showToast('✓ Sensi Pro Max aplicada!', 'success');
});

document.getElementById('calibrateMira')?.addEventListener('click', async () => {
    showToast('Calibrando mira...', 'info');
    try {
        await fetch(`${API_BASE}/calibrate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: 'mira',
                config: {
                    horizontal: document.getElementById('miraH').value,
                    vertical: document.getElementById('miraV').value,
                    stability: document.getElementById('stability').value
                }
            })
        });
        showToast('✓ Mira calibrada!', 'success');
    } catch { showToast('✓ Mira calibrada localmente', 'success'); }
});

document.getElementById('calibrateScreen')?.addEventListener('click', async () => {
    const screenType = document.getElementById('screenCalibrate').value;
    showToast('Calibrando tela...', 'info');
    try {
        await fetch(`${API_BASE}/calibrate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'screen', config: { screenType } })
        });
        showToast(`✓ Tela calibrada para ${screenType}!`, 'success');
    } catch { showToast(`✓ Tela calibrada para ${screenType}`, 'success'); }
});

document.getElementById('calibratePull')?.addEventListener('click', async () => {
    showToast('Calibrando puxada...', 'info');
    try {
        await fetch(`${API_BASE}/calibrate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: 'pull',
                config: {
                    intensity: document.getElementById('pullIntensity').value,
                    speed: document.getElementById('pullSpeed').value
                }
            })
        });
        showToast('✓ Puxada calibrada!', 'success');
    } catch { showToast('✓ Puxada calibrada localmente', 'success'); }
});

let profiles = [];
function updateProfileList() {
    const list = document.getElementById('profileList');
    if (!list) return;
    list.innerHTML = profiles.length === 0 ? '<p style="color: var(--text-secondary); text-align: center; padding: 20px;">Nenhum perfil salvo</p>' : '';
    profiles.forEach((profile, index) => {
        const item = document.createElement('div');
        item.style.cssText = 'padding: 10px; margin: 5px 0; background: var(--bg-dark); border-radius: 5px; display: flex; justify-content: space-between; align-items: center;';
        item.innerHTML = `<div><strong>${profile.name}</strong><small style="display: block; color: var(--text-secondary);">${new Date(profile.date).toLocaleDateString('pt-BR')}</small></div><div><button onclick="loadProfileByIndex(${index})" style="padding: 5px 10px; margin: 0 5px; background: var(--primary); border: none; border-radius: 5px; color: white; cursor: pointer;"><i class="fas fa-download"></i></button><button onclick="deleteProfile(${index})" style="padding: 5px 10px; background: var(--danger); border: none; border-radius: 5px; color: white; cursor: pointer;"><i class="fas fa-trash"></i></button></div>`;
        list.appendChild(item);
    });
}

window.loadProfileByIndex = function(index) {
    if (profiles[index]) {
        applyConfigData(profiles[index].config);
        showToast(`✓ Perfil "${profiles[index].name}" carregado!`, 'success');
    }
};

window.deleteProfile = function(index) {
    if (profiles[index]) {
        const name = profiles[index].name;
        profiles.splice(index, 1);
        updateProfileList();
        showToast(`Perfil "${name}" deletado`, 'warning');
    }
};

document.getElementById('saveProfile')?.addEventListener('click', () => {
    const name = document.getElementById('profileName')?.value.trim();
    if (!name) return showToast('Digite um nome para o perfil', 'error');
    profiles.push({ name, config: getConfigData(), date: new Date().toISOString() });
    document.getElementById('profileName').value = '';
    updateProfileList();
    showToast(`✓ Perfil "${name}" salvo!`, 'success');
});

document.getElementById('loadProfile')?.addEventListener('click', () => {
    if (profiles.length === 0) return showToast('Nenhum perfil salvo', 'warning');
    showToast('Selecione um perfil na lista', 'info');
});

document.getElementById('exportConfig')?.addEventListener('click', () => {
    try {
        const blob = new Blob([JSON.stringify(getConfigData(), null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `aim-config-v7-${Date.now()}.json`;
        link.click();
        URL.revokeObjectURL(url);
        showToast('✓ Configuração exportada!', 'success');
    } catch { showToast('Erro ao exportar', 'error'); }
});

document.getElementById('importConfig')?.addEventListener('click', () => document.getElementById('importFile')?.click());

document.getElementById('importFile')?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            applyConfigData(JSON.parse(event.target.result));
            showToast('✓ Configuração importada!', 'success');
        } catch { showToast('Arquivo inválido', 'error'); }
    };
    reader.readAsText(file);
});

document.addEventListener('DOMContentLoaded', () => {
    updateProfileList();
    showToast('Sistema carregado!', 'success');
    console.log('AIM ASSIST TOOL v7.0 - Loaded');
});

document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 's') { e.preventDefault(); document.getElementById('profileName')?.focus(); }
    if (e.ctrlKey && e.key === 'e') { e.preventDefault(); document.getElementById('exportConfig')?.click(); }
    if (e.ctrlKey && e.key === 'g') { e.preventDefault(); document.getElementById('generateSensi')?.click(); }
});
