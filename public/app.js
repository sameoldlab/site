import Swup from "swup"
import SwupA11y from '@swup/a11y-plugin'
import SwupPreload from '@swup/preload-plugin'
import SwupFadeTheme from '@swup/fade-theme'

const swup = new Swup({
    plugins: [new SwupA11y(), new SwupPreload(), new SwupFadeTheme()]
})
