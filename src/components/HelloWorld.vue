/* eslint-disable vue/require-v-for-key */

<template>
    <div class="hello">
        <div class="grid">
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-1"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-1"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div :class="testclass"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-1"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-1"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-1"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-1"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-1"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-1"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-1"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-1"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-1"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-1"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-1"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-1"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-1"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-1"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-1"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-1"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-1"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-1"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-1"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-1"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-1"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-1"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-1"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-1"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-1"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-1"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-1"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-1"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-1"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-1"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item item-1-2"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-1"></div>
            <div class="item item-1-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item"></div>
            <div class="item item-2-2"></div>
            <div class="item item-2-2"></div>
        </div>

        <button
            @click="layout"
            style="position: fixed; bottom: 20px; right: 20px"
        >
            Layout
        </button>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Masonry } from "./masonry";

const Packery = require("packery");
const Draggabilly = require("draggabilly");

@Component
export default class HelloWorld extends Vue {
    m = null as any;
    testclass = "item";
    mounted() {
        const el = document.querySelector(".grid")! as HTMLElement;
        const items = document.querySelectorAll(".item")!;

        const elements: HTMLElement[] = [];
        for (const item of items) {
            elements.push(item as HTMLElement);
        }
        this.m = new Masonry(el, elements);
        console.log(document.querySelectorAll(".item").length);

        // this.m = new Packery(".grid", {
        //     itemSelector: ".item",
        //     columnWidth: 80
        // });
        // for (const item of document.querySelectorAll(".item") || []) {
        //     (item as HTMLElement).style.opacity = "1";
        //     var draggie = new Draggabilly(item);
        //     this.m.bindDraggabillyEvents(draggie);
        // }
    }

    layout() {
        this.testclass = "item item-2-2 red";
        this.$nextTick(() => {
            this.m.test();
        });
    }
}
</script>
<style lang="scss">
.red{
    background: red;
}
.grid{
  width: 1800px;
  height: 76800px;
  background: #f3f3f3;
  position: relative;
}

.item{
  box-sizing: border-box;
  padding: 4px;
width: 80px;
height: 80px;
opacity: 0;
transition: top 0.5s, left 0.5s,right 0.5s,bottom 0.5s;
}

.item::after{
background: rgba(13, 218, 204, 0.8);
position: absolute;
top:0;
left:0;
right:0;
bottom: 0;
content: "";
margin: 2px;
}

.item2{
  opacity: 0;
  box-sizing: border-box;
}

.item2::after{
background: rgba(239, 14, 14,0.2);
position: absolute;
top:0;
left:0;
right:0;
bottom: 0;
content: "";
margin: 2px;
}

.item-2-2{
width: 160px;
height: 160px;
}

.item-2-1{
width: 160px;
height: 80px;
}

.item-1-2{
width: 80px;
height: 160px;
}
</style>
