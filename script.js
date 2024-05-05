function load() {
    if (window.location.href === 'https://www.roblox.com/my/account#!/privacy') {
        let runningUnblocking = false;
        const button = document.createElement('button');

        button.setAttribute('class', 'acct-settings-btn btn-control-sm btn--width');
        button.textContent = 'Unblock All';

        button.addEventListener('click', async () => {

            if (!runningUnblocking) {
                runningUnblocking = true;
                const lockButton = document.querySelector('.icon-locked');
                const showHideButton = document.querySelector('#show-blocked-users-btn');
                let lastUnblockButtonsAmount = null;

                if (lockButton) {
                    await lockButton.parentNode.click();
                    const btn = [...document.getElementsByTagName('button')].find((e) => {
                        if (e.textContent === "Unlock") {
                            return (e.parentNode.parentNode.parentNode.parentNode.getAttribute('role') === 'dialog');
                        }
                        else return false;
                    });
                    const handler = () => {
                        if (!btn.disabled) {
                            (new MutationObserver((mList, observer) => {
                                for (const m of mList) {2
                                    if (m.target.classList.contains("icon-unlocked")) {
                                        button.click();
                                        btn?.removeEventListener("click", handler);
                                        observer.disconnect();
                                    }
                                }
                            })).observe(lockButton, {attributes: true});
                        }
                    }
                    btn?.addEventListener("click", handler);
                }
                else {
                    const unblockingInterval = setInterval(async () => {
                        if (lastUnblockButtonsAmount !== 'done') {
                            if (button.parentNode.parentNode.parentNode.childElementCount < 2) await showHideButton.click();
                            
                            const unblockButtonList = Array.prototype.filter.call(
                                document.getElementsByTagName('button'),
                                (e) => (e.textContent === 'Unblock')
                            );

                            if (lastUnblockButtonsAmount === unblockButtonList.length) {
                                if (unblockButtonList.length > 0) {
                                    if (button.parentNode.parentNode.parentNode.childElementCount < 2) await showHideButton.click();
                                    await unblockButtonList[0].click();
                                }
                                
                                if (unblockButtonList.length === 0) lastUnblockButtonsAmount = 'done';
                                else lastUnblockButtonsAmount--;
                            }
                            else if (lastUnblockButtonsAmount == null) {
                                lastUnblockButtonsAmount = unblockButtonList.length;
                            }
                        }
                        else if (lastUnblockButtonsAmount === 'done') {
                            clearInterval(unblockingInterval);
                        }
                    }, 250);
                }
                runningUnblocking = false;
            }

        });

        if (document.querySelector('#show-blocked-users') != undefined) {
            console.log('\n\nFOUND BLOCK\n\n')
            document.querySelector('#show-blocked-users').prepend(button);
            const media = window.matchMedia("(min-width: 544px)");
            if (media.matches) {
                button.style.marginLeft = '3px';
            }
            else {
                button.style.marginLeft = '0';
            }
            media.addEventListener('change', (event) => {
                if (event.currentTarget.matches) {
                    button.style.marginLeft = '3px';
                }
                else {
                    button.style.marginLeft = '0';
                }
            });
        }
        else {
            console.log('\n\nNOT FOUND\n\n')
            const m = new MutationObserver((ml, ob) => {
                if (document.getElementById('show-blocked-users') != null) {
                    console.log("OBSERVEDD")
                    document.querySelector('#show-blocked-users').prepend(button);
                    ob.disconnect();
                    const media = window.matchMedia("(min-width: 544px)");
                    if (media.matches) {
                        button.style.marginLeft = '3px';
                    }
                    else {
                        button.style.marginLeft = '0';
                    }
                    media.addEventListener('change', (event) => {
                        if (event.currentTarget.matches) {
                            button.style.marginLeft = '3px';
                        }
                        else {
                            button.style.marginLeft = '0';
                        }
                    });
                };
            })
            m.observe(document.querySelector('body'), {childList:true, subtree:true, attributes:false, characterData:false});
        }
    }
}

if (document.readyState === 'complete') load();
else {
    window.addEventListener('load', load);
}