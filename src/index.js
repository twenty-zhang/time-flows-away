((doc, win) => {
    let globalLanguage = 'zh-chs';
    const i18n = key => {
        if (globalLanguage === 'zh-chs')
            switch (key) {
                case'year':
                    return '年';
                case'month':
                    return '个月';
                case'month_with_zero':
                    return '个月零';
                case'day':
                    return '天';
                case 'hour':
                    return '小时零';
                case 'min':
                    return '分';
                case 'week_1':
                    return '星期一';
                case 'week_2':
                    return '星期二';
                case 'week_3':
                    return '星期三';
                case 'week_4':
                    return '星期四';
                case 'week_5':
                    return '星期五';
                case 'week_6':
                    return '星期六';
                case 'week_0':
                    return '星期日';
                default:
                    return 'i18n中未定义';
            }
        else
            switch (key) {
                case'year':
                    return ' YEARS ';
                case'month':
                    return 'MONTHS'
                case'month_with_zero':
                    return ' MONTHS AND ';
                case'day':
                    return ' DAYS ';
                case 'hour':
                    return ' HOURS AND ';
                case 'min':
                    return ' MINUTES ';
                case 'week_1':
                    return 'Mon.';
                case 'week_2':
                    return 'Tues.';
                case 'week_3':
                    return 'Wed.';
                case 'week_4':
                    return 'Thur.';
                case 'week_5':
                    return 'Fri.';
                case 'week_6':
                    return 'Sat.';
                case 'week_0':
                    return 'Sun.';
                default:
                    return 'Undefined';
            }
    };
    const modifyTextSetter = selector => {
        const elem = doc.querySelector(selector);
        let text;
        return newText => {
            if (newText !== text) {
                text = newText;
                elem.textContent = newText;
                return true;
            }
            return false;
        };
    };
    const timerTextDiv = {time: modifyTextSetter('#time_div'), date: modifyTextSetter('#date_div')};
    const timerProgressBar = {
        year: doc.querySelector('#date>.mask#year>.progress_bar'),
        month: doc.querySelector('#date>.mask#month>.progress_bar'),
        day: doc.querySelector('#time>.mask#day>.progress_bar'),
        hour: doc.querySelector('#time>.mask#hour>.progress_bar'),
        min: doc.querySelector('#time>.mask#min>.progress_bar')
    };
    const otherVariable = {
        set_12_24: '24',
        show_weeks: false,
        data_format: 'y.m.d',
        time_format: 'h.m.s',
        from_friend_tips: false,
        birthday: false,
        pre_birthday: '',
        birthday_string: 0,
        birthday_string_type: 'detail',
        suf_birthday: '',
        text_background_color: {rgb: [], a: ''},
        body_background_color: []
    };
    const translateColor = weColor => weColor.split(' ').map(value => Math.ceil(value * 255));
    const getBody = doc.getElementsByTagName('body').item(0);
    win.wallpaperPropertyListener = {
        'applyGeneralProperties'(properties) {
            globalLanguage = properties.language;
        }, 'applyUserProperties'(properties) {
            if (properties['date_size'])
                doc.getElementById('date').style.fontSize = properties['date_size'].value + 'px';
            if (properties['time_size'])
                doc.getElementById('time').style.fontSize = properties['time_size'].value + 'px';
            if (properties['header_slogan'])
                doc.getElementById('header_slogan').textContent = properties['header_slogan'].value;
            if (properties['header_slogan_size'])
                doc.getElementById('header_slogan').style.fontSize = properties['header_slogan_size'].value + 'px';
            if (properties['footer_slogan'])
                doc.getElementById('footer_slogan').textContent = properties['footer_slogan'].value;
            if (properties['footer_slogan_size'])
                doc.getElementById('footer_slogan').style.fontSize = properties['footer_slogan_size'].value + 'px';
            if (properties['min_color']) {
                const backgroundColor = 'rgb(' + translateColor(properties['min_color'].value) + ')';
                doc.getElementById('min').style.borderColor = backgroundColor;
                timerProgressBar.min.style.backgroundColor = backgroundColor;
            }
            if (properties['hour_color']) {
                const backgroundColor = 'rgb(' + translateColor(properties['hour_color'].value) + ')';
                doc.getElementById('hour').style.borderColor = backgroundColor;
                timerProgressBar.hour.style.backgroundColor = backgroundColor;
            }
            if (properties['month_color']) {
                const backgroundColor = 'rgb(' + translateColor(properties['month_color'].value) + ')';
                doc.getElementById('month').style.borderColor = backgroundColor;
                timerProgressBar.month.style.backgroundColor = backgroundColor;
            }
            if (properties['year_color']) {
                const backgroundColor = 'rgb(' + translateColor(properties['year_color'].value) + ')';
                doc.getElementById('year').style.borderColor = backgroundColor;
                timerProgressBar.year.style.backgroundColor = backgroundColor;
            }
            if (properties['day_color']) {
                const backgroundColor = 'rgb(' + translateColor(properties['day_color'].value) + ')';
                doc.getElementById('day').style.borderColor = backgroundColor;
                timerProgressBar.day.style.backgroundColor = backgroundColor;
            }
            if (properties['text_color'])
                doc.getElementById('text').style.color = 'rgb(' + translateColor(properties['text_color'].value) + ')';
            if (properties['position_h'])
                getBody.style.alignItems = properties['position_h'].value;
            if (properties['position_v'])
                getBody.style.justifyContent = properties['position_v'].value;
            if (properties['12_24'])
                otherVariable.set_12_24 = properties['12_24'].value;
            if (properties['show_weeks'])
                otherVariable.show_weeks = properties['show_weeks'].value;
            if (properties['data_format'])
                otherVariable.data_format = properties['data_format'].value;
            if (properties['time_format'])
                otherVariable.time_format = properties['time_format'].value;
            if (properties['font_family'])
                getBody.style.fontFamily = properties['font_family'].value;
            if (properties['from_friend_tips'])
                otherVariable.from_friend_tips = properties['from_friend_tips'].value;
            if (properties['birthday'])
                otherVariable.birthday = properties['birthday'].value;
            if (properties['birthday_string'])
                otherVariable.birthday_string = (new Date(properties['birthday_string'].value.replace(new RegExp('\\D', 'g'), '/'))).getTime();
            if (properties['prefix_birthday_string'])
                otherVariable.pre_birthday = properties['prefix_birthday_string'].value;
            if (properties['suffix_birthday_string'])
                otherVariable.suf_birthday = properties['suffix_birthday_string'].value;
            if (properties['birthday_string_size'])
                doc.getElementById('birthday_div').style.fontSize = properties['birthday_string_size'].value + 'px';
            if (properties['birthday_string_type'])
                otherVariable.birthday_string_type = properties['birthday_string_type'].value;
            if (properties['body_color']) {
                const color = translateColor(properties['body_color'].value);
                doc.getElementById('text').style.backgroundColor = 'rgba(' + color + ',' + otherVariable.text_background_color.a + ')';
                getBody.style.backgroundColor = 'rgb(' + color + ')';
                otherVariable.body_background_color = color;
            }
            if (properties['background_image']) {
                if (!properties['background_image'].value)
                    doc.getElementById('text').style.backgroundColor = 'rgba(' + otherVariable.body_background_color + ',0)';
                else
                    doc.getElementById('text').style.backgroundColor = 'rgba(' + otherVariable.text_background_color.rgb + ',' + otherVariable.text_background_color.a + ')';
                getBody.style.backgroundImage = 'url("' + 'file:///' + properties['background_image'].value + '")';
            }
            if (properties['text_opacity_color'] && getBody.style.backgroundImage.toString() !== 'url("file:///")') {
                const customColor = translateColor(properties['text_opacity_color'].value);
                doc.getElementById('text').style.backgroundColor = 'rgba(' + customColor + ',' + (otherVariable.text_background_color.a ? otherVariable.text_background_color.a : 0) + ')';
                otherVariable.text_background_color.rgb = customColor;
            }
            if (properties['text_opacity']) {
                doc.getElementById('text').style.backgroundColor = 'rgba(' + otherVariable.text_background_color.rgb + ',' + properties['text_opacity'].value + ')';
                otherVariable.text_background_color.a = properties['text_opacity'].value;
            }
            if (properties['scroll_size'])
                for (const elementsByClassNameElement of doc.getElementsByClassName(`mask`))
                    elementsByClassNameElement.style.width = (properties['scroll_size'].value * 5.3) + 'px';
        }
    };
    doc.addEventListener('DOMContentLoaded', () => {
        const updateText = _ => {
            const now = new Date();
            timerTextDiv.date(otherVariable.data_format.replace('y', now.getFullYear().toString(10)).replace('m', (now.getMonth() + 1).toFixed().padStart(2, '0')).replace('d', now.getDate().toFixed().padStart(2, '0'))
                + (otherVariable.show_weeks ? ' ' + i18n('week_' + now.getDay()) : ''));
            let timeDiv;
            if (otherVariable.set_12_24 === '12') {
                let hour = now.getHours();
                hour = hour > 12 ? hour - 12 : hour;
                timeDiv = hour.toFixed().padStart(2, '0');
            } else
                timeDiv = now.getHours().toFixed().padStart(2, '0');
            const second = now.getSeconds();
            if (timerTextDiv.time(otherVariable.time_format.replace('h', timeDiv).replace('m', now.getMinutes().toFixed().padStart(2, '0')).replace('s', second.toFixed().padStart(2, '0')))) {
                const minAndSec = second + 60 * now.getMinutes();
                const day = (((now.getDate() - 1) * 86400 + minAndSec + (3600 * now.getHours())) / (new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate() * 86400));
                timerProgressBar.year.style.maxWidth = `${(now.getMonth() + day) / 0.12}%`;
                timerProgressBar.month.style.maxWidth = `${day * 100}%`;
                timerProgressBar.day.style.maxWidth = `${(minAndSec + 3600 * now.getHours()) / 864}%`;
                timerProgressBar.hour.style.maxWidth = `${minAndSec / 36}%`;
                timerProgressBar.min.style.maxWidth = `${second / 0.6}%`;
            }
            if (otherVariable.from_friend_tips === true) {
                doc.getElementById('friend_div').style.display = 'inline';
                if (otherVariable.birthday === true) {
                    doc.querySelector('.birthday').style.display = 'inline';
                    let totalDays;
                    let number = now.getTime() - otherVariable.birthday_string;
                    let number_abs = Math.abs(number);
                    if (otherVariable.birthday_string_type === 'days')
                        totalDays = Math.floor(number_abs / 86400000) + i18n('day');
                    else if (otherVariable.birthday_string_type === 'detail')
                        totalDays = Math.floor(number_abs / (31536000000)) + i18n('year') + Math.floor(((number_abs / 86400000) % 365) / 30) + i18n('month_with_zero') + Math.floor(((number_abs / 86400000) % 365) % 30) + i18n('day');
                    else if (otherVariable.birthday_string_type === 'very_detail') {
                        totalDays = Math.floor(number_abs / (31536000000)) + i18n('year') + Math.floor(((number_abs / 86400000) % 365) / 30) + i18n('month') + Math.floor(((number_abs / 86400000) % 365) % 30) + i18n('day')
                            + (number < 0 ? ((24 - now.getHours()) + i18n('hour') + (60 - now.getMinutes())) : (now.getHours() + i18n('hour') + now.getMinutes())) + i18n('min');
                    }
                    doc.getElementById('birthday_div').textContent = otherVariable.pre_birthday + totalDays + otherVariable.suf_birthday;
                } else
                    doc.querySelector('.birthday').style.display = 'none';
            } else
                doc.getElementById('friend_div').style.display = 'none';
        };
        setInterval(updateText, 1000);
        updateText();
    });
})(document, window);