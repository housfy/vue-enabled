<script>
export default {
  name: 'Standard'
}
</script>


<template>
  <div>
    {{ $e('featureA') ? 'FeatureA Enabled' : 'FeatureA Disabled' }}
  </div>
</template>
