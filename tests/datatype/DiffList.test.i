require "DiffList.i"
require "Trivial.i"

claim one_two_soles -- Trivial DiffList end

define one_two_soles
  sole (cons :tail) diff rot rot connect
  sole (cons :tail) sole cons diff rot rot connect
  diff_append
end

one_two_soles inspect run inspect

claim two_two_soles -- Trivial DiffList end

define two_two_soles
  sole (cons :tail) sole cons diff rot rot connect
  sole (cons :tail) sole cons diff rot rot connect
  diff_append
end

two_two_soles inspect run inspect

claim two_two_soles_with_local -- Trivial DiffList end

define two_two_soles_with_local
  sole (cons :tail) sole cons diff $value connect value
  sole (cons :tail) sole cons diff $value connect value
  diff_append
end

two_two_soles_with_local inspect run inspect
