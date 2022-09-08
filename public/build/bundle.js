
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if ($$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.22.2' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src\App.svelte generated by Svelte v3.22.2 */

    const file = "src\\App.svelte";

    function create_fragment(ctx) {
    	let main;
    	let h1;
    	let t1;
    	let div2;
    	let div0;
    	let t2;
    	let div1;
    	let h30;
    	let t4;
    	let content;
    	let div7;
    	let div4;
    	let h31;
    	let t6;
    	let div3;
    	let h20;
    	let t8;
    	let div6;
    	let h32;
    	let t10;
    	let div5;
    	let h21;
    	let t12;
    	let div12;
    	let div9;
    	let h33;
    	let t14;
    	let div8;
    	let h22;
    	let t16;
    	let div11;
    	let h34;
    	let t18;
    	let div10;
    	let h23;

    	const block = {
    		c: function create() {
    			main = element("main");
    			h1 = element("h1");
    			h1.textContent = "Tikotyökkäri";
    			t1 = space();
    			div2 = element("div");
    			div0 = element("div");
    			t2 = space();
    			div1 = element("div");
    			h30 = element("h3");
    			h30.textContent = "Login";
    			t4 = space();
    			content = element("content");
    			div7 = element("div");
    			div4 = element("div");
    			h31 = element("h3");
    			h31.textContent = "Ilmoita avoimesta työtehtävästä";
    			t6 = space();
    			div3 = element("div");
    			h20 = element("h2");
    			h20.textContent = "Työnantajille";
    			t8 = space();
    			div6 = element("div");
    			h32 = element("h3");
    			h32.textContent = "Löydä töitä";
    			t10 = space();
    			div5 = element("div");
    			h21 = element("h2");
    			h21.textContent = "Opiskelijoille";
    			t12 = space();
    			div12 = element("div");
    			div9 = element("div");
    			h33 = element("h3");
    			h33.textContent = "Löydä tekijä työtehtävään";
    			t14 = space();
    			div8 = element("div");
    			h22 = element("h2");
    			h22.textContent = "Selaa opiskelijoita";
    			t16 = space();
    			div11 = element("div");
    			h34 = element("h3");
    			h34.textContent = "Palvelun toiminta ja laskutus";
    			t18 = space();
    			div10 = element("div");
    			h23 = element("h2");
    			h23.textContent = "Ohjeita";
    			attr_dev(h1, "class", "svelte-1m8kc2z");
    			add_location(h1, file, 4, 2, 29);
    			attr_dev(div0, "class", "headUnderline svelte-1m8kc2z");
    			add_location(div0, file, 6, 4, 82);
    			attr_dev(h30, "class", "svelte-1m8kc2z");
    			add_location(h30, file, 8, 6, 139);
    			attr_dev(div1, "id", "login");
    			attr_dev(div1, "class", "svelte-1m8kc2z");
    			add_location(div1, file, 7, 4, 116);
    			attr_dev(div2, "class", "loginblock svelte-1m8kc2z");
    			add_location(div2, file, 5, 2, 53);
    			attr_dev(h31, "class", "svelte-1m8kc2z");
    			add_location(h31, file, 15, 8, 254);
    			add_location(h20, file, 17, 10, 341);
    			attr_dev(div3, "class", "pieniLaatikko svelte-1m8kc2z");
    			add_location(div3, file, 16, 8, 303);
    			attr_dev(div4, "class", "isoLaatikko svelte-1m8kc2z");
    			add_location(div4, file, 14, 6, 220);
    			attr_dev(h32, "class", "svelte-1m8kc2z");
    			add_location(h32, file, 22, 8, 433);
    			add_location(h21, file, 24, 10, 500);
    			attr_dev(div5, "class", "pieniLaatikko svelte-1m8kc2z");
    			add_location(div5, file, 23, 8, 462);
    			attr_dev(div6, "class", "isoLaatikko svelte-1m8kc2z");
    			add_location(div6, file, 21, 6, 399);
    			attr_dev(div7, "class", "firstRow");
    			add_location(div7, file, 13, 4, 191);
    			attr_dev(h33, "class", "svelte-1m8kc2z");
    			add_location(h33, file, 30, 8, 631);
    			add_location(h22, file, 32, 10, 712);
    			attr_dev(div8, "class", "pieniLaatikko svelte-1m8kc2z");
    			add_location(div8, file, 31, 8, 674);
    			attr_dev(div9, "class", "isoLaatikko svelte-1m8kc2z");
    			add_location(div9, file, 29, 6, 597);
    			attr_dev(h34, "class", "svelte-1m8kc2z");
    			add_location(h34, file, 37, 8, 810);
    			add_location(h23, file, 39, 10, 895);
    			attr_dev(div10, "class", "pieniLaatikko svelte-1m8kc2z");
    			add_location(div10, file, 38, 8, 857);
    			attr_dev(div11, "class", "isoLaatikko svelte-1m8kc2z");
    			add_location(div11, file, 36, 6, 776);
    			attr_dev(div12, "class", "secondRow");
    			add_location(div12, file, 28, 4, 567);
    			attr_dev(content, "class", "svelte-1m8kc2z");
    			add_location(content, file, 12, 2, 177);
    			attr_dev(main, "class", "svelte-1m8kc2z");
    			add_location(main, file, 3, 0, 20);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, h1);
    			append_dev(main, t1);
    			append_dev(main, div2);
    			append_dev(div2, div0);
    			append_dev(div2, t2);
    			append_dev(div2, div1);
    			append_dev(div1, h30);
    			append_dev(main, t4);
    			append_dev(main, content);
    			append_dev(content, div7);
    			append_dev(div7, div4);
    			append_dev(div4, h31);
    			append_dev(div4, t6);
    			append_dev(div4, div3);
    			append_dev(div3, h20);
    			append_dev(div7, t8);
    			append_dev(div7, div6);
    			append_dev(div6, h32);
    			append_dev(div6, t10);
    			append_dev(div6, div5);
    			append_dev(div5, h21);
    			append_dev(content, t12);
    			append_dev(content, div12);
    			append_dev(div12, div9);
    			append_dev(div9, h33);
    			append_dev(div9, t14);
    			append_dev(div9, div8);
    			append_dev(div8, h22);
    			append_dev(div12, t16);
    			append_dev(div12, div11);
    			append_dev(div11, h34);
    			append_dev(div11, t18);
    			append_dev(div11, div10);
    			append_dev(div10, h23);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props) {
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("App", $$slots, []);
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
