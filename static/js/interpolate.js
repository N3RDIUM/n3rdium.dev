export default function interpolate(initial, final, progress) {
    return initial - (initial - final) * progress
}