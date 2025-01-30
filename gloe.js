if (window.gloe) { console.error("Gloe already initialized in this environment!"); } else {
    const gloeStyleElement = document.createElement('style');
    gloeStyleElement.innerHTML = `@import url("https://rsms.me/inter/inter.css");
@import url("https://legacy.klash.dev/legacy.css");
.gloe-window {
    width: 400px;
    z-index: 9999;
    font-family: InterVariable, Inter;
    height: 200px;
    position: absolute;
    color: white;
    top: 10px;
    left: 10px;
    background: #0000009f;
    backdrop-filter: blur(40px);
    border: 2px solid #00000050;
    border-radius: 6px;
}
.gloe-topbar {
    width: 100%;
    height: 35px;
    border-bottom: 2px solid #ffffff30;
    background: #1118;
    display: flex;
    align-items: center;
    padding: 0 5px;
    font-family: KlashLegacy;
    box-sizing: border-box;
    user-select: none;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}
.gloe-title {
    width: 70%;
    height: 100%;
    display: flex;
    align-items: center;
}
.gloe-buttons {
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.gloe-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 25px;
    background: #1113;
    border: 2px solid #ffffff60;
    border-radius: 6px;
}
.gloe-button:hover {
    background: #ffffff18;
}
.gloe-content {
    height: calc(100% - 35px);
    border-radius: 4px;
    overflow-y: scroll;
    scrollbar-color: #1115 transparent;
    scrollbar-width: thin;
    margin: 0px 3px;
    box-sizing: border-box;
}
.gloe-content button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 25px;
    width: auto;
    padding: 0 2px;
    flex-direction: row;
    gap: 2px;
    background: #1113;
    border: 2px solid #ffffff60;
    border-radius: 6px;
}`;
    document.body.insertAdjacentElement('beforeend', gloeStyleElement);
    window.gloe = {
        _draggable(windowElement, headerElement) {
            let isDragging = false, offsetX = 0, offsetY = 0;
            headerElement.addEventListener("mousedown", (e) => {
                isDragging = true;
                offsetX = e.clientX - windowElement.offsetLeft;
                offsetY = e.clientY - windowElement.offsetTop;
            });
            document.addEventListener("mousemove", (e) => {
                if (!isDragging) return;
                windowElement.style.left = `${Math.min(
                    Math.max(e.clientX - offsetX, -windowElement.offsetWidth / 2),
                    window.innerWidth - windowElement.offsetWidth / 2
                )}px`;
                windowElement.style.top = `${Math.min(
                    Math.max(e.clientY - offsetY, -windowElement.offsetHeight / 2),
                    window.innerHeight - windowElement.offsetHeight / 2
                )}px`;
            });

            document.addEventListener("mouseup", () => (isDragging = false));
        },
        clickFor(query, callback) {document.querySelector(query).addEventListener('click', callback)},
        loadGoogleFont(fonts){document.head.appendChild(Object.assign(document.createElement("link"), { rel: "stylesheet", href: `https://fonts.googleapis.com/css2?${fonts.map(f => `family=${f.name.replace(/\s+/g, '+')}:wght@${f.weights.join(';')}`).join('&')}&display=swap` }));},
        create(props) {
            const { id, title, content, onCreated } = props;
            const windowElement = document.createElement("div");
            windowElement.className = "gloe-window";
            windowElement.id = id || `gloewindow-${Math.floor(Date.now() * Math.random())}`;
            windowElement.style.position = "absolute";
            const topbar = document.createElement("div");
            topbar.className = "gloe-topbar";
            const titleSpan = document.createElement("span");
            titleSpan.className = "gloe-title";
            titleSpan.textContent = title || "Untitled";
            topbar.appendChild(titleSpan);
            const buttonsDiv = document.createElement("div");
            buttonsDiv.className = "gloe-buttons";
            const button = document.createElement("button");
            button.className = "gloe-button";
            const buttonIcon = document.createElement("img");
            buttonIcon.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAZhJREFUOE9VU+magyAMnLDv5oX7tMtR7bOZ2S8QrPVHKxgmcwRhfyAQEEAIIgBgP7a2fQjbggLoZcVeT0BUyWVdANoKOI+znemnxfcFQrataZooYs2IVz1sXzkvK87ztOp+8NHVVu0xIvZPAYWYp4n19TIAcl5mvM+3XNfFYBqsgzMywEao0VfWWhHjLgbwMoC7A4CUM+O2IsiPGMXx0UhRlaVUxD1+JLrKG8O6pL/MLW5uZjeDF1lqQYzRyA27GitvMlzrWtNf4hZjA6GSJRfE39hrm0cjJWk+P3caqhXllLhtG3It2PddPEmv7X73OJ8AA8vDGCClFMR9/47XqXwZcsdFMzRxWzdI+GlRNxlm4FdHZ9Cn0MUByDlxXbsHXa9AebFkS2F3/s/xeAjMOXNtUYaHPE9DlTm7J7cNSs7rgvdxSEp+OIRb2hgivxjgpZQQZJ4n1jbKaqO84H2exuO+RY9gXcQQ2b/co6yqfpn6VJzH0V863LiIt2A72OdBUI9qDGzox3QIjN7nUg0L+wRZlVL7S2sj+Ad0mAr3VMR7YgAAAABJRU5ErkJggg==";
            buttonIcon.addEventListener('click', (e) => {
                windowElement.remove();
            });
            button.appendChild(buttonIcon);
            buttonsDiv.appendChild(button);
            topbar.appendChild(buttonsDiv);
            windowElement.appendChild(topbar);
            const contentDiv = document.createElement("div");
            contentDiv.className = "gloe-content";
            if (content) {
                if (typeof content === "string") {
                    contentDiv.innerHTML = content;
                } else if (content instanceof HTMLElement) {
                    contentDiv.appendChild(content);
                }
            } else {
                contentDiv.textContent = "No content provided for Gloe";
            }
            windowElement.appendChild(contentDiv);
            document.body.appendChild(windowElement);
            this._draggable(windowElement, topbar);
            if (onCreated && typeof onCreated === "function") {
                onCreated(windowElement);
            }

            return windowElement;
        }
    }
};
