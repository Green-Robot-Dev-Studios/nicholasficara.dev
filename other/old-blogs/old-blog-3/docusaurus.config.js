// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const math = require("remark-math");
const katex = require("rehype-katex");

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: "Nick's Digital Garden",
    tagline: "Here is everything I know.",
    url: "https://wiki.nicholasficara.dev",
    baseUrl: "/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    favicon: "img/favicon.ico",
    organizationName: "nicholasficara", // Usually your GitHub org/user name.
    projectName: "wiki", // Usually your repo name.

    stylesheets: [
        {
            href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
            type: "text/css",
            integrity:
                "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
            crossorigin: "anonymous",
        },
    ],

    presets: [
        [
            "classic",
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    remarkPlugins: [math],
                    rehypePlugins: [[katex, {
                        macros: {
                            "\\equality": "{\\Lleftarrow}\\!{\\Rrightarrow}"
                        }
                    }]],
                    routeBasePath: "/",
                    sidebarPath: require.resolve("./sidebars.js"),
                    // Please change this to your repo.
                    editUrl: ".",
                },
                blog: {
                    blogSidebarCount: 5,
                    showReadingTime: true,
                    // Please change this to your repo.
                    editUrl: ".",
                },
                theme: {
                    customCss: require.resolve("./src/css/custom.css"),
                },
            }),
        ],
    ],
    clientModules: [
        require.resolve('./scr.js'),
      ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            navbar: {
                title: "Nick's Digital Garden",
                logo: {
                    alt: "Site Logo",
                    src: "img/logo.svg",
                },
                items: [
                    {
                        type: "doc",
                        docId: "intro",
                        position: "left",
                        label: "Everything I know",
                    },
                    { to: "/blog", label: "Blog", position: "left" },
                    {
                        href: "https://github.com/Green-Robot-Dev-Studios/nicholasficara.dev",
                        label: "GitHub",
                        position: "right",
                    },
                    {
                        href: "https://nicholasficara.dev",
                        label: "Portfolio",
                        position: "right",
                    },
                ],
            },
            footer: {
                style: "dark",
                links: [],
                copyright: `Copyright © ${new Date().getFullYear()} Nicholas Ficara - Built with Docusaurus.`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
        }),
};

module.exports = config;
